const request = require('request');
const { XMLParser } = require('fast-xml-parser');

const db = require('./db/mysql');

// 공공데이터 포털 API 공용 KEY
const API_KEY = process.env.API_KEY;

// API 호출 URL
const API_ICN_AIRPORT_PARKING = `http://apis.data.go.kr/B551177/StatusOfParking/getTrackingParking?serviceKey=${ API_KEY }&numOfRows=100&pageNo=1&type=json`;
const API_KOR_AIRPORT_PARKING = `http://openapi.airport.co.kr/service/rest/AirportParking/airportparkingRT?serviceKey=${ API_KEY }`;
const API_KOR_AIRPORT_INSIDE  = `http://api.odcloud.kr/api/getAPRTPsgrCongestion/v1/aprtPsgrCongestion​?serviceKey=${ API_KEY }&page=1&perPage=10`;

/**
 * 인천국제공항 주차장 혼잡도 API 호출
 * 인천국제공항공사
 * http
 * json
 */
const doCallAPIICNAirportParkingTraffic = () => {
    request(encodeURI(API_ICN_AIRPORT_PARKING), async function (err, res, body) {
        if (err != null) {
            console.log('인천국제공항 주차장 혼잡도 현황 API 호출 비정상');
            console.log(err);
            return;
        }

        const result = JSON.parse(body).response.body.items;

        var airportName         = '';
        var airportParkingName  = '';
        var airportParking      = '';
        var airportParkingSpace = '';
        var updateDate          = '';
        var insertDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ');
        
        result.forEach(item => {
            airportName         += '인천국제공항'             + '*';
            airportParkingName  += item.floor                + '*';
            airportParking      += item.parking              + '*';
            airportParkingSpace += item.parkingarea          + '*';
            updateDate          += item.datetm.split('.')[0] + '*';
        });

        const setTraffic = await db.doCallProcedure(`CALL SET_KOR_ICN_PARKING_TRAFFIC(?, ?, ?, ?, ?, ?)`, 
            [airportName, airportParkingName, airportParking, airportParkingSpace, updateDate, insertDate]);

        try { 
            if (setTraffic[0][0][0].성공 === undefined) {
                console.log('인천국제공항 내부 혼잡도 혼잡도 현황 DB 입력 비정상');
                return;
            }
        } catch (err) {
            console.log('인천국제공항 내부 혼잡도 혼잡도 현황 DB 입력 비정상');
            console.log(err);
            return;
        }

        console.log('인천국제공항 주차장 혼잡도 현황 API 호출 및 DB 입력 완료');
    });
}

/** 
 * 한국공항 주차장 혼잡도 현황
 * 한국공항공사
 * 호출 http 
 * 데이터 타입 xml(json 미지원)
 */
const doCallAPIKORAirportParkingTraffic = () => {
    request(encodeURI(API_KOR_AIRPORT_PARKING), async function (err, res, body) {
        if (err != null) {
            console.log('한국공항 주차장 혼잡도 현황 API 호출 비정상');
            console.log(err);
            return;
        }

        const result = new XMLParser({
            ignoreAttributes: false, 
            attributeNamePrefix : "@_"
        }).parse(body).response.body.items.item;
        
        var airportName         = '';
        var airportParkingName  = '';
        var airportParking      = '';
        var airportParkingSpace = '';
        var updateDate          = '';
        var insertDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ');
        
        for (i = 0; i < result.length; i++) {
            airportName         += result[i].aprKor + '*';
            airportParkingName  += result[i].parkingAirportCodeName + '*';
            airportParking      += result[i].parkingIstay + '*';
            airportParkingSpace += result[i].parkingFullSpace + '*';
            updateDate          += result[i].parkingGetdate + ' ' + result[i].parkingGettime + '*';
        }
        
        const setTraffic = await db.doCallProcedure(`CALL SET_KOR_ICN_PARKING_TRAFFIC(?, ?, ?, ?, ?, ?)`, 
            [airportName, airportParkingName, airportParking, airportParkingSpace, updateDate, insertDate]);
        
        try { 
            if (setTraffic[0][0][0].성공 === undefined) {
                console.log('한국공항 주차장 혼잡도 현황 DB 입력 비정상');
                return;
            }
        } catch (err) {
            console.log('한국공항 주차장 혼잡도 현황 DB 입력 비정상');
            console.log(err);
            return;
        }

        console.log('한국공항 주차장 혼잡도 현황 API 호출 및 DB 입력 완료');
    });
}


/**
 * 한국공항 내부 혼잡도 현황
 * 한국공항공사
 * 호출 http 
 * 데이터 타입 json
 */
const doCallAPIKORAirportInsideTraffic = () => {
    request(encodeURI(API_KOR_AIRPORT_INSIDE), async function (err, res, body) {
        if (err != null) {
            console.log('한국공항 내부 혼잡도 현황 API 호출 비정상');
            console.log(err);
            return;
        }

        const result = JSON.parse(body).data;

        var airportCode = '';
        var levelAll    = '';
        var levelA      = '';
        var levelB      = '';
        var levelC      = '';
        var updateDate  = '';
        var insertDate  = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ');

        result.forEach(item => {
            airportCode += item.IATA_APCD          + '*';
            levelAll    += (item.CGDR_ALL_LVL + 1) + '*';
            levelA      += (item.CGDR_A_LVL + 1)   + '*';
            levelB      += (item.CGDR_B_LVL + 1)   + '*';
            levelC      += (item.CGDR_C_LVL + 1)   + '*';
            updateDate  += `${ new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10) } ${ item.PRC_HR }` + '*';
        });
        
        const setTraffic = await db.doCallProcedure(`CALL SET_KOR_INSIDE_TRAFFIC(?, ?, ?, ?, ?, ?, ?)`, 
            [airportCode, levelAll, levelA, levelB, levelC, updateDate, insertDate]);
        
        try { 
            if (setTraffic[0][0][0].성공 === undefined) {
                console.log('한국공항 내부 혼잡도 혼잡도 현황 DB 입력 비정상');
                return;
            }
        } catch (err) {
            console.log('한국공항 내부 혼잡도 혼잡도 현황 DB 입력 비정상');
            console.log(err);
            return;
        }

        console.log('한국공항 내부 혼잡도 현황 API 호출 및 DB 입력 완료');
    });

}


module.exports = {
    doCallAPIICNAirportParkingTraffic, 
    doCallAPIKORAirportParkingTraffic, 
    doCallAPIKORAirportInsideTraffic
}