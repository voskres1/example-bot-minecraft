const mineflayer = require("mineflayer")
const pathfinder = require('mineflayer-pathfinder')
const {Movements, goals: {GoalNear, GoalBlock, GoalFollow, GoalXZ}, setAvoidPlayers, maxDropDown, allowFreeMotion, blocksToAvoid, entitiesToAvoid, searchRadius, allowEntityDetection, allowSprinting, getMoveDiagonal} = require('mineflayer-pathfinder')
const Vec3 = require('vec3').Vec3

var nikBot = '' //ник вашего рапика
var nik = '' //ваш ник
var goToMe = 'сюда' //команда для подзова к себе
var stop = 'стоп'// остановить рапиков
var start = 'фарм'// начать фарм
var follow = 'за мной'//преследовать




const bot = mineflayer.createBot({
    host: 'mc.mineblaze.net',
    port: '25565',
    version: '1.12.2',
    username: nikBot})



bot.loadPlugin(pathfinder.pathfinder)

var player = bot.players['ЗДЕСЬ ВАШ НИК']

bot.on('spawn', function(){
  bot.chat("/reg passwd12")
  bot.chat("/login passwd12")
})
setTimeout(() => {bot.activateItem(false)}, 3000)
let kitPvP = true
if (kitPvP === true){
  bot.on('windowOpen', function(window) {

    bot.clickWindow(40, 0, 0);

    bot.clickWindow(11, 0, 0)

  })
  kitPvP = false
}


function go() {
  const mcData = require('minecraft-data')(bot.version)
  const targetPos = new Vec3(12, 112, -24);
  const goal = new GoalBlock(targetPos.x, targetPos.y, targetPos.z);
  const defaultMove = new Movements(bot, mcData)
  defaultMove.entitiesToAvoid = new Set()
  defaultMove.allowEntityDetection = false
  defaultMove.blocksToAvoid = new Set()
  defaultMove.allowFreeMotion = true
  defaultMove.maxDropDown = 10000
  bot.pathfinder.searchRadius = 50
  defaultMove.searchRadius = 50
  defaultMove.setAvoidPlayers = false
  defaultMove.canDig = false
  defaultMove.allowSprinting = true
  defaultMove.getMoveDiagonal = true
  bot.pathfinder.setAvoidPlayers = false

  bot.pathfinder.setMovements(defaultMove)

  bot.pathfinder.setGoal(new GoalBlock(targetPos.x, targetPos.y, targetPos.z), true)
}
let a = false



bot.on('messagestr', function(messagestr, username) {
    if (messagestr === '[ЗДЕСЬ ВАШ ДОНАТ] '+nik+'  → '+goToMe) {
        const player = bot.players['ЗДЕСЬ ВАШ НИК']

        bot.pathfinder.setGoal(new GoalNear(player.entity.position.x, player.entity.position.y, player.entity.position.z, 1))
    }

    if (messagestr === '[ЗДЕСЬ ВАШ ДОНАТ] '+nik+'  → '+start) {
        const targetPos = new Vec3(12, 112, -24)
        bot.pathfinder.setGoal(new GoalBlock(targetPos.x, targetPos.y, targetPos.z), true)
        a = true
    }

    if (messagestr === '[ЗДЕСЬ ВАШ ДОНАТ] '+nik+'  → '+stop) {
        bot.pathfinder.setGoal(null, 1)
        a = false
    }

    if (messagestr === '[ЗДЕСЬ ВАШ ДОНАТ] '+nik+'  → строй') {
      let player = bot.players[nik]
      const targetPos1 = new Vec3(player.entity.position.x, player.entity.position.y, player.entity.position.z - 7)

      bot.pathfinder.setGoal(new GoalBlock(targetPos1.x, targetPos1.y, targetPos1.z, 1))

    }

    if (messagestr === '[Вип] '+nik+'  → '+follow) {
      let player = bot.players[nik]
      bot.pathfinder.setGoal(new GoalFollow(player.entity, 1), true)
    }

  })

if (kitPvP === true){
  setTimeout(() => {bot.activateItem(false)}, 3000)
  bot.on('windowOpen', function(window) {

    bot.clickWindow(40, 0, 0);

    bot.clickWindow(11, 0, 0)

})
    kitPvP = false
  }

  if (a === true) {
    bot.on('spawn', go)
}