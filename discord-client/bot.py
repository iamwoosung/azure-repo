import discord

from discord.ext import commands
from api import APIClient  

class AirportCommand(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.api = APIClient()

    '''
    커맨드 오류
    '''
    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.CommandNotFound):
            await ctx.send("죄송합니다, 입력하신 명령은 존재하지 않습니다. \n!help 입력으로 확인 바랍니다! 🙏")
        elif isinstance(error, commands.MissingRequiredArgument):
            await ctx.send("죄송합니다, 입력하신 명령을 이해하지 못했습니다. \n!help 입력으로 확인 바랍니다! 🙏")
            

    '''
    !공항리스트 커맨드
    '''
    @commands.command(name='공항리스트', help='전체 공항의 목록 및 세부 정보를 조회합니다. 사용법: !공항리스트')
    async def airport_list(self, ctx):
        result = await self.api.get_airport_list()
        if result:
            output = discord.Embed(title=f"__**공항리스트 및 세부 정보 안내드립니다 😊:**__", color=0x2986cc,timestamp= ctx.message.created_at)
            for airport in result:
                output.add_field(name=f'**{airport.airport_name} ✈️**', 
                                value="".join([
                                    f"> 코드: {airport.airport_code}\n",
                                    f"> 공사: {airport.airport_company}\n",
                                    f"> 주소: {airport.airport_address}\n",
                                    f"> 전화: {airport.airport_tel}\n",
                                    f"> 개장일: {airport.airport_open_date}\n",
                                    f"> 내부 혼잡도: {'지원' if airport.airport_inside_traffic == 1 else '미지원'}\n",
                                    f"> 주차 혼잡도: {'지원' if airport.airport_parking_traffic == 1 else '미지원'}\n "
                                ]), 
                                inline=False)
            
            await ctx.send(embed=output)
        else:
            await ctx.send("죄송합니다, 입력하신 명령을 이해하지 못했습니다. \n!help 입력으로 확인 바랍니다! 🙏")



    @commands.command(name='실시간', help='특정 공항의 실시간 혼잡도를 조회합니다. 사용법: !실시간 <공항이름>')
    async def airport_traffic_now(self, ctx, *, airport_name: str):
        result = await self.api.get_airport_traffic_now(airport_name)

        if result:
            output = discord.Embed(title=f"__**실시간 공항 혼잡도 안내드립니다 😊:**__", color=0x2986cc,timestamp= ctx.message.created_at)
            output.add_field(name=f'**{result[0][0].airport_name} ✈️**', 
                                value="".join([
                                    f"> 코드: {result[0][0].airport_code}\n",
                                    f"> 공사: {result[0][0].airport_company}\n",
                                    f"> 주소: {result[0][0].airport_address}\n",
                                    f"> 전화: {result[0][0].airport_tel}\n",
                                    f"> 개장일: {result[0][0].airport_open_date}\n",
                                    f"> 내부 혼잡도: {'지원' if result[0][0].airport_inside_traffic == 1 else '미지원'}\n",
                                    f"> 주차 혼잡도: {'지원' if result[0][0].airport_parking_traffic == 1 else '미지원'}\n "
                                ]), 
                                inline=False)
            if result[1]:
                output.add_field(name=f'**실시간 내부 혼잡도 👪**', 
                                value="".join([
                                    f"> A구역: {result[1][0].level_a} 레벨({result[1][0].level_a_str})\n",
                                    f"> B구역: {result[1][0].level_b} 레벨({result[1][0].level_b_str})\n",
                                    f"> C구역: {result[1][0].level_c} 레벨({result[1][0].level_c_str})\n",
                                    f"> 최종 변경: {result[1][0].update_date}\n",
                                ]), 
                                inline=False)
            else:
                output.add_field(name=f'**실시간 내부 혼잡도 👪**', 
                                value=f"> 해당 공항은 내부 혼잡도를 지원하지 않습니다.\n",
                                inline=False)
            
            parking_str = ""
            for airport in result[2]:
                parking_str += f"> {airport.airport_parking_name}: {airport.airport_parking} / {airport.airport_parking_space}\n"
            output.add_field(name=f'**실시간 주차 혼잡도 🚗**', 
                            value= parking_str + f"> 최종 변경: {result[2][0].update_date}\n" + f"> 최종 입력: {result[2][0].insert_date}",
                            inline=False)
              
            
            await ctx.send(embed=output)
        else: 
            await ctx.send("죄송합니다, 입력하신 명령을 이해하지 못했습니다. \n!help 입력으로 확인 바랍니다! 🙏")
