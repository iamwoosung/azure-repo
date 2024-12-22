CREATE TABLE airport(airportNo INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '공항목록 번호', airportCode VARCHAR(5) NOT NULL COMMENT '공항코드', airportName VARCHAR(20) NOT NULL COMMENT '공항명', airportCompany VARCHAR(20) NOT NULL COMMENT '관리/운영 공사', airportAddress VARCHAR(50) NOT NULL COMMENT '공항 주소', airportTel VARCHAR(20) NOT NULL COMMENT '공항 고객 서비스 번호', airportOpenDate DATE NOT NULL COMMENT '공항 개장일', airportInsideTraffic TINYINT(1) NOT NULL COMMENT '공항 내부 혼잡도 지원 여부', airportParkingTraffic TINYINT(1) NOT NULL COMMENT '공항 주차장 혼잡도 지원 여부') COMMENT='공항목록';

CREATE TABLE airportSystemLog(logNo INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '로그 번호', result VARCHAR(100) NOT NULL COMMENT '결과', contents VARCHAR(100) NOT NULL COMMENT '내용', insertTime DATETIME NOT NULL COMMENT '입력 시간') COMMENT='시스템로그'


INSERT INTO airport VALUES(NULL, 'ICN', '인천국제공항', '인천국제공항공사', '인천광역시 중구 공항로 272', '1577-2600', '2001-03-29', 0, 1);
INSERT INTO airport VALUES(NULL, 'GMP', '김포국제공항', '한국공항공사', '서울특별시 강서구 하늘길 112', '1661-2626', '1939-01-01', 1, 1);
INSERT INTO airport VALUES(NULL, 'PUS', '김해국제공항', '한국공항공사', '부산광역시 강서구 공항진입로 108', '1661-2626', '1976-08-01', 1, 1);
INSERT INTO airport VALUES(NULL, 'CJU', '제주국제공항', '한국공항공사', '제주특별자치도 제주시 특별자치도, 공항로 2', '1661-2626', '1968-04-26', 1, 1);
INSERT INTO airport VALUES(NULL, 'TAE', '대구국제공항', '한국공항공사', '대구광역시 동구 공항로 221', '1661-2626', '1961-04-01', 1, 1);
INSERT INTO airport VALUES(NULL, 'KWJ', '광주공항', '한국공항공사', '광주광역시 광산구 상무대로 420-25', '1661-2626', '1948-11-01', 1, 1);
INSERT INTO airport VALUES(NULL, 'RSU', '여수공항', '한국공항공사', '전라남도 여수시 율촌면 여순로 386', '061-659-5699', '1972-05-23', 1, 1);
INSERT INTO airport VALUES(NULL, 'USN', '울산공항', '한국공항공사', '울산광역시 북구 산업로 1103', '1661-2626', '1970-11-20', 1, 1);
INSERT INTO airport VALUES(NULL, 'KUV', '군산공항', '한국공항공사', '전라북도 군산시 옥서면 산동길 2', '1661-2626', '1970-08-01', 1, 1);
INSERT INTO airport VALUES(NULL, 'WJU', '원주공항', '한국공항공사', '강원도 횡성군 횡성읍 횡성로 38', '1661-2626', '1997-02-28', 1, 1);
INSERT INTO airport VALUES(NULL, 'CJJ', '청주국제공항', '한국공항공사', '충청북도 청주시 청원구 내수읍 오창대로 980', '1661-2626', '1997-04-28', 1, 1);
INSERT INTO airport VALUES(NULL, 'MWX', '무안국제공항', '한국공항공사', '전라남도 무안군 망운면 공항로 970-260', '1661-2626', '2007-11-08', 1, 1);
INSERT INTO airport VALUES(NULL, 'HIN', '사천공항', '한국공항공사', '경상남도 사천시 사천읍 사천대로 1971 (구암리)', '1661-2626', '1969-11-01', 1, 1);
INSERT INTO airport VALUES(NULL, 'YNY', '양양국제공항', '한국공항공사', '강원도 양양군 손양면 공항로 201', '1661-2626', '2002-04-02', 1, 1);
