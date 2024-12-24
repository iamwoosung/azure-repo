import discord
from discord.ext import commands

from bot import AirportCommand

from quickchart import QuickChart

qc = QuickChart()
qc.width = 500
qc.height = 300
qc.device_pixel_ratio = 2.0
qc.config = {
    "type": "bar",
    "data": {
        "labels": ["Hello world", "Test"],
        "datasets": [{
            "label": "Foo",
            "data": [1, 2]
        }]
    }
} 


TOKEN = 
CHANNEL_ID = 

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix = '!', help_command = None, intents=intents)

@bot.event
async def on_ready():
    # bot 인스턴스에 
    # 커맨드 클래스 바인딩
    await bot.add_cog(AirportCommand(bot))
 

bot.run(TOKEN)




# Print a chart URL
print(qc.get_url())

# Print a short chart URL
print(qc.get_short_url())
