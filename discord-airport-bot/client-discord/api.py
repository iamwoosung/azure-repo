import aiohttp
from models.airport import Airport 
from models.inside import AirportInside 
from models.parking import AirportParking 


class APIClient:
    
    def __init__(self):
        self.base_url = "http://localhost:3000/api/airport"  

    async def get_airport_list(self):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f"{self.base_url}/list") as response:
                    response.raise_for_status()  
                    data = await response.json()
                    return [Airport(**airport) for airport in data] 
            except Exception as e:
                return None


    async def get_airport_traffic_now(self, airport_name):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f"{self.base_url}/now", params={"airportName": airport_name}) as response:
                    response.raise_for_status()  
                    data = await response.json()
                    if len(data[0]) == 0:
                        return None
                    else:
                        ret1 = [Airport(**airport) for airport in data[0]]
                        ret2 = None if len(data[1][0]) == 1 else [AirportInside(**airport) for airport in data[1]]
                        ret3 = [AirportParking(**airport) for airport in data[2]]
                        return ret1, ret2, ret3
            except Exception as e:
                print(e)
                return None