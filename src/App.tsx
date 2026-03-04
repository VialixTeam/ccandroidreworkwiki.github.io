import { useState, useMemo, useCallback } from 'react';
import { translations, Language } from './i18n/translations';

/* ─── Types ─── */
interface MethodParam {
  name: string;
  type: string;
  desc: { ru: string; en: string };
  default?: string;
}

interface MethodDef {
  name: string;
  desc: { ru: string; en: string };
  params?: MethodParam[];
  returns: { ru: string; en: string };
  requires?: { ru: string; en: string };
  exceptions?: { ru: string; en: string };
  limit?: string;
  code?: string;
  events?: { ru: string; en: string };
  tags?: string[];
}

interface CategoryDef {
  key: string;
  methods: MethodDef[];
}

/* ─── API Data ─── */
const apiData: CategoryDef[] = [
  {
    key: 'taskManagement',
    methods: [
      { name: 'currentTask()', desc: { ru: 'Возвращает имя текущей выполняемой задачи.', en: 'Returns the name of the currently running task.' }, returns: { ru: '`string|nil` — название задачи или `nil` если нет активной', en: '`string|nil` — task name or `nil` if none active' }, code: 'local task = android.currentTask()\nif task then\n    print("Executing: " .. task)\nend' },
      { name: 'isTaskRunning()', desc: { ru: 'Проверяет, выполняется ли какая-либо задача.', en: 'Checks if any task is running.' }, returns: { ru: '`boolean`', en: '`boolean`' }, code: 'while android.isTaskRunning() do\n    os.sleep(0.5)\nend\nprint("Done!")' },
      { name: 'cancelTask()', desc: { ru: 'Отменяет текущую задачу.', en: 'Cancels the current task.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'stop()', desc: { ru: 'Отменяет текущую задачу и останавливает навигацию.', en: 'Cancels the current task and stops navigation.' }, returns: { ru: '`true`', en: '`true`' } },
    ],
  },
  {
    key: 'selfInfo',
    methods: [
      { name: 'getSelf()', desc: { ru: 'Возвращает полную информацию об андроиде.', en: 'Returns complete information about the android.' }, returns: { ru: '`table` — данные через SensorModule', en: '`table` — data via SensorModule' } },
      { name: 'getAndroidType()', desc: { ru: 'Возвращает тип андроида.', en: 'Returns the android type.' }, returns: { ru: '`string` — `"normal"`, `"advanced"` или `"command"`', en: '`string` — `"normal"`, `"advanced"` or `"command"`' } },
      { name: 'getName()', desc: { ru: 'Возвращает имя андроида.', en: 'Returns the android name.' }, returns: { ru: '`string`', en: '`string`' } },
      { name: 'setName(name)', desc: { ru: 'Устанавливает имя андроида.', en: 'Sets the android name.' }, params: [{ name: 'name', type: 'string', desc: { ru: 'Новое имя (макс. 32 символа)', en: 'New name (max 32 characters)' } }], returns: { ru: '`true`', en: '`true`' }, exceptions: { ru: '`LuaException` если имя слишком длинное', en: '`LuaException` if name is too long' }, code: 'android.setName("Wall-E")' },
      { name: 'isAlive()', desc: { ru: 'Проверяет, жив ли андроид.', en: 'Checks if the android is alive.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
    ],
  },
  {
    key: 'combat',
    methods: [
      { name: 'attackFront()', desc: { ru: 'Атакует ближайшую сущность перед собой (в конусе ~45°).', en: 'Attacks the nearest entity in front (~45° cone).' }, returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'], code: 'local ok, name = android.attackFront()\nif ok then\n    print("Attacking " .. name)\nend' },
      { name: 'attackUp()', desc: { ru: 'Атакует ближайшую видимую сущность сверху.', en: 'Attacks the nearest visible entity above.' }, returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'attackDown()', desc: { ru: 'Атакует ближайшую видимую сущность снизу.', en: 'Attacks the nearest visible entity below.' }, returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'attackEntity(uuid)', desc: { ru: 'Атакует конкретную сущность по UUID.', en: 'Attacks a specific entity by UUID.' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '4', tags: ['fuel'], code: 'local mobs = android.getNearbyMobs("minecraft:zombie")\nif mobs and #mobs > 0 then\n    android.attackEntity(mobs[1].uuid)\nend' },
      { name: 'shootBow([power])', desc: { ru: 'Стреляет из лука по ближайшей видимой цели впереди.', en: 'Shoots a bow at the nearest visible target in front.' }, params: [{ name: 'power', type: 'number', desc: { ru: 'Сила выстрела (0.1 — 1.0)', en: 'Shot power (0.1 — 1.0)' }, default: '1.0' }], returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо, лук в руке, стрелы в инвентаре', en: 'fuel, bow in hand, arrows in inventory' }, limit: '32', tags: ['fuel'], code: 'android.shootBow(0.8)' },
      { name: 'getAttackDamage()', desc: { ru: 'Возвращает базовый урон атаки.', en: 'Returns base attack damage.' }, returns: { ru: '`number`', en: '`number`' } },
      { name: 'getReach()', desc: { ru: 'Возвращает максимальную дальность ближнего боя.', en: 'Returns maximum melee range.' }, returns: { ru: '`number` — всегда `4.0`', en: '`number` — always `4.0`' } },
    ],
  },
  {
    key: 'navigation',
    methods: [
      { name: 'moveTo(x, y, z)', desc: { ru: 'Идёт к блоку через pathfinding.', en: 'Moves to a block via pathfinding.' }, params: [{ name: 'x, y, z', type: 'int', desc: { ru: 'Координаты', en: 'Coordinates' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '64', tags: ['fuel'], code: 'android.moveTo(100, 64, 200)\n-- or\nandroid.moveTo({x=100, y=64, z=200})' },
      { name: 'goTo(entityUUID)', desc: { ru: 'Идёт к сущности через pathfinding.', en: 'Moves to an entity via pathfinding.' }, params: [{ name: 'entityUUID', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '64', tags: ['fuel'], code: 'local player = android.getClosestPlayer()\nif player then\n    android.goTo(player.uuid)\nend' },
      { name: 'canReach(x, y, z)', desc: { ru: 'Проверяет, существует ли путь до позиции.', en: 'Checks if a path exists to the position.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getPathLength(x, y, z)', desc: { ru: 'Возвращает длину пути до позиции.', en: 'Returns path length to the position.' }, returns: { ru: '`number|nil` — длина пути или `nil` если путь не найден', en: '`number|nil` — path length or `nil` if no path found' } },
    ],
  },
  {
    key: 'simpleMovement',
    methods: [
      { name: 'forward()', desc: { ru: 'Шаг вперёд на 1 блок.', en: 'Step forward 1 block.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'], code: 'for i = 1, 10 do\n    local ok, err = android.forward()\n    if not ok then\n        print("Blocked: " .. err)\n        break\n    end\n    os.sleep(0.3)\nend' },
      { name: 'back()', desc: { ru: 'Шаг назад на 1 блок.', en: 'Step back 1 block.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'up()', desc: { ru: 'Движение вверх (прыжок).', en: 'Move up (jump).' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, isOnGround', en: 'fuel, isOnGround' }, tags: ['fuel'] },
      { name: 'down()', desc: { ru: 'Движение вниз на 1 блок.', en: 'Move down 1 block.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'jump()', desc: { ru: 'Прыжок на месте (без горизонтального движения).', en: 'Jump in place (no horizontal movement).' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, isOnGround', en: 'fuel, isOnGround' }, tags: ['fuel'] },
    ],
  },
  {
    key: 'autoDigMovement',
    methods: [
      { name: 'stepForward()', desc: { ru: 'Шаг вперёд с автоматическим копанием блоков на пути.', en: 'Step forward with automatic block digging.' }, returns: { ru: '`true` | `true, "digging"` | `false, reason`', en: '`true` | `true, "digging"` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'], code: 'for i = 1, 100 do\n    local ok, status = android.stepForward()\n    if not ok then break end\n    if status == "digging" then\n        while android.isTaskRunning() do os.sleep(0.1) end\n    end\nend' },
      { name: 'stepUp()', desc: { ru: 'Шаг вверх с автокопанием.', en: 'Step up with auto-digging.' }, returns: { ru: '`true` | `true, "digging"` | `true, "jumping"` | `false, reason`', en: '`true` | `true, "digging"` | `true, "jumping"` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'stepDown()', desc: { ru: 'Шаг вниз с автокопанием.', en: 'Step down with auto-digging.' }, returns: { ru: '`true` | `true, "digging"` | `false, reason`', en: '`true` | `true, "digging"` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'climbUp()', desc: { ru: 'Подъём (прыжок + вперёд) с автокопанием 3 блоков.', en: 'Climb up (jump + forward) with auto-digging 3 blocks.' }, returns: { ru: '`true` | `true, "digging"` | `true, "climbing"` | `false, reason`', en: '`true` | `true, "digging"` | `true, "climbing"` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'tunnelForward()', desc: { ru: 'Прокапывает туннель 1×2 и движется вперёд.', en: 'Digs a 1×2 tunnel and moves forward.' }, returns: { ru: '`true` | `true, "digging_low"` | `true, "digging_high"` | `false, reason`', en: '`true` | `true, "digging_low"` | `true, "digging_high"` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'], code: 'for i = 1, 50 do\n    local ok, status = android.tunnelForward()\n    if not ok then break end\n    while android.isTaskRunning() do os.sleep(0.1) end\nend' },
    ],
  },
  {
    key: 'waterAndClimbing',
    methods: [
      { name: 'swim()', desc: { ru: 'Плывёт в направлении взгляда.', en: 'Swims in look direction.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, нахождение в воде', en: 'fuel, being in water' }, tags: ['fuel'] },
      { name: 'dive()', desc: { ru: 'Погружается вниз в воде.', en: 'Dives down in water.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, нахождение в воде', en: 'fuel, being in water' }, tags: ['fuel'] },
      { name: 'surfaceFromWater()', desc: { ru: 'Всплывает на поверхность.', en: 'Surfaces from water.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, нахождение в воде', en: 'fuel, being in water' }, tags: ['fuel'] },
      { name: 'climbLadder()', desc: { ru: 'Карабкается вверх по лестнице/лозе.', en: 'Climbs up a ladder/vine.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, нахождение на climbable блоке', en: 'fuel, being on a climbable block' }, tags: ['fuel'] },
      { name: 'crawl()', desc: { ru: 'Ползёт вперёд (для пространств 1 блок высотой).', en: 'Crawls forward (for 1-block-high spaces).' }, returns: { ru: '`true`', en: '`true`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'isSwimming()', desc: { ru: 'Проверяет, плывёт ли андроид.', en: 'Checks if android is swimming.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'isClimbing()', desc: { ru: 'Проверяет, карабкается ли по лестнице.', en: 'Checks if android is climbing.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getSwimDirection()', desc: { ru: 'Возвращает направление плавания.', en: 'Returns swim direction.' }, returns: { ru: '`table|nil` — `{x, y, z}` или `nil`', en: '`table|nil` — `{x, y, z}` or `nil`' } },
    ],
  },
  {
    key: 'blockDetection',
    methods: [
      { name: 'detectFront()', desc: { ru: 'Есть ли блок спереди (не воздух).', en: 'Is there a block in front (not air).' }, returns: { ru: '`boolean`', en: '`boolean`' }, code: 'if android.detectFront() then\n    android.digFront()\nend' },
      { name: 'detectUp()', desc: { ru: 'Есть ли блок сверху.', en: 'Is there a block above.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'detectDown()', desc: { ru: 'Есть ли блок снизу.', en: 'Is there a block below.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getBlockInFront()', desc: { ru: 'Информация о блоке спереди.', en: 'Info about the block in front.' }, returns: { ru: '`table|"air"`', en: '`table|"air"`' }, code: '-- Returns:\n{\n    name = "minecraft:stone",\n    x = 10, y = 64, z = 20,\n    hardness = 1.5\n}' },
      { name: 'getBlockAbove()', desc: { ru: 'Информация о блоке над головой (up(2)).', en: 'Info about the block above head (up(2)).' }, returns: { ru: '`table|"air"`', en: '`table|"air"`' } },
      { name: 'getBlockBelow()', desc: { ru: 'Информация о блоке под ногами.', en: 'Info about the block below.' }, returns: { ru: '`table|"air"`', en: '`table|"air"`' } },
    ],
  },
  {
    key: 'miningAndBuilding',
    methods: [
      { name: 'digFront()', desc: { ru: 'Копает блок спереди.', en: 'Digs the block in front.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'digUp()', desc: { ru: 'Копает блок сверху.', en: 'Digs the block above.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'digDown()', desc: { ru: 'Копает блок снизу.', en: 'Digs the block below.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'breakBlock(x, y, z)', desc: { ru: 'Ломает блок по координатам.', en: 'Breaks a block at coordinates.' }, params: [{ name: 'x, y, z', type: 'int', desc: { ru: 'Координаты', en: 'Coordinates' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, видимость блока', en: 'fuel, block visibility' }, limit: '6', tags: ['fuel'], code: 'android.breakBlock(100, 64, 200)\nwhile android.isTaskRunning() do os.sleep(0.1) end' },
      { name: 'placeFront()', desc: { ru: 'Ставит блок из руки спереди.', en: 'Places a block from hand in front.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, BlockItem в руке', en: 'fuel, BlockItem in hand' }, tags: ['fuel'] },
      { name: 'placeUp()', desc: { ru: 'Ставит блок сверху.', en: 'Places a block above.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, BlockItem в руке', en: 'fuel, BlockItem in hand' }, tags: ['fuel'] },
      { name: 'placeDown()', desc: { ru: 'Ставит блок снизу.', en: 'Places a block below.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, BlockItem в руке', en: 'fuel, BlockItem in hand' }, tags: ['fuel'] },
      { name: 'placeBlock(x, y, z)', desc: { ru: 'Ставит блок по координатам.', en: 'Places a block at coordinates.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, BlockItem в руке', en: 'fuel, BlockItem in hand' }, limit: '5', tags: ['fuel'] },
      { name: 'compareBlock(x, y, z)', desc: { ru: 'Сравнивает блок в мире с блоком в руке.', en: 'Compares a world block with the block in hand.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
    ],
  },
  {
    key: 'interaction',
    methods: [
      { name: 'useBlock(x, y, z)', desc: { ru: 'Правый клик по блоку.', en: 'Right-click on a block.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '5', tags: ['fuel'] },
      { name: 'useEntity(uuid)', desc: { ru: 'Правый клик по сущности.', en: 'Right-click on an entity.' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '5', tags: ['fuel'] },
      { name: 'useItem()', desc: { ru: 'Использует предмет в руке. Еда → лечение.', en: 'Uses item in hand. Food → healing.' }, returns: { ru: '`true, healing` | `false, reason`', en: '`true, healing` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'], code: 'local ok, healing = android.useItem()\nif ok then\n    print("Restored " .. healing .. " HP")\nend' },
      { name: 'useItemOnBlock(x, y, z)', desc: { ru: 'Использует предмет на блоке.', en: 'Uses item on a block.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '5', tags: ['fuel'] },
      { name: 'useItemOnEntity(uuid)', desc: { ru: 'Использует предмет на сущности.', en: 'Uses item on an entity.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '5', tags: ['fuel'] },
    ],
  },
  {
    key: 'inventory',
    methods: [
      { name: 'getHandInfo(hand)', desc: { ru: 'Информация о предмете в руке.', en: 'Info about item in hand.' }, params: [{ name: 'hand', type: 'string', desc: { ru: '"right"/"main" или "left"/"off"', en: '"right"/"main" or "left"/"off"' } }], returns: { ru: '`table|nil`', en: '`table|nil`' }, code: '-- Returns:\n{\n    name = "minecraft:diamond_pickaxe",\n    count = 1, maxCount = 1,\n    displayName = "Diamond Pickaxe",\n    damage = 50, maxDamage = 1561\n}' },
      { name: 'swapHands()', desc: { ru: 'Меняет предметы между руками.', en: 'Swaps items between hands.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'storeItem(index)', desc: { ru: 'Кладёт предмет из руки в слот инвентаря.', en: 'Stores item from hand to inventory slot.' }, params: [{ name: 'index', type: 'int', desc: { ru: 'Индекс слота (0-based)', en: 'Slot index (0-based)' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' } },
      { name: 'equipSlot(index)', desc: { ru: 'Берёт предмет из слота в руку.', en: 'Takes item from slot to hand.' }, params: [{ name: 'index', type: 'int', desc: { ru: 'Индекс слота (0-based)', en: 'Slot index (0-based)' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'пустую руку', en: 'empty hand' } },
      { name: 'getSlotInfo(index)', desc: { ru: 'Информация о предмете в слоте.', en: 'Info about item in slot.' }, params: [{ name: 'index', type: 'int', desc: { ru: 'Индекс слота (0-based)', en: 'Slot index (0-based)' } }], returns: { ru: '`table|nil`', en: '`table|nil`' } },
      { name: 'select(slot)', desc: { ru: 'Выбирает слот (turtle-стиль).', en: 'Selects a slot (turtle-style).' }, params: [{ name: 'slot', type: 'int', desc: { ru: 'Номер слота (1-based)', en: 'Slot number (1-based)' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'getSelectedSlot()', desc: { ru: 'Текущий выбранный слот.', en: 'Currently selected slot.' }, returns: { ru: '`int` — (1-based)', en: '`int` — (1-based)' } },
      { name: 'getItemDetail([slot])', desc: { ru: 'Детальная информация о предмете в слоте.', en: 'Detailed item info in slot.' }, params: [{ name: 'slot', type: 'int', desc: { ru: 'Номер слота (1-based)', en: 'Slot number (1-based)' }, default: 'selected' }], returns: { ru: '`table|nil`', en: '`table|nil`' } },
      { name: 'getItemCount([slot])', desc: { ru: 'Количество предметов в слоте.', en: 'Item count in slot.' }, params: [{ name: 'slot', type: 'int', desc: { ru: 'Номер слота (1-based)', en: 'Slot number (1-based)' }, default: 'selected' }], returns: { ru: '`int`', en: '`int`' } },
      { name: 'getItemSpace([slot])', desc: { ru: 'Свободное место в слоте.', en: 'Free space in slot.' }, params: [{ name: 'slot', type: 'int', desc: { ru: 'Номер слота (1-based)', en: 'Slot number (1-based)' }, default: 'selected' }], returns: { ru: '`int`', en: '`int`' } },
      { name: 'transferTo(toSlot, [count])', desc: { ru: 'Перемещает предметы из выбранного слота в указанный.', en: 'Transfers items from selected slot to target.' }, params: [{ name: 'toSlot', type: 'int', desc: { ru: 'Целевой слот (1-based)', en: 'Target slot (1-based)' } }, { name: 'count', type: 'int', desc: { ru: 'Количество', en: 'Amount' }, default: 'all' }], returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'list()', desc: { ru: 'Список всех непустых слотов.', en: 'List of all non-empty slots.' }, returns: { ru: '`table` — `{[slot] = {name, count}, ...}`', en: '`table` — `{[slot] = {name, count}, ...}`' }, code: 'local items = android.list()\nfor slot, item in pairs(items) do\n    print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)\nend' },
      { name: 'findItem(itemName)', desc: { ru: 'Ищет предмет в инвентаре.', en: 'Finds an item in inventory.' }, params: [{ name: 'itemName', type: 'string', desc: { ru: 'ID предмета', en: 'Item ID' } }], returns: { ru: '`"main"|"off"|int|nil`', en: '`"main"|"off"|int|nil`' }, code: 'local where = android.findItem("minecraft:diamond")\nif where == "main" then\n    print("In hand!")\nelseif type(where) == "number" then\n    android.equipSlot(where - 1)\nend' },
      { name: 'hasItem(itemName)', desc: { ru: 'Проверяет наличие предмета.', en: 'Checks if item exists.' }, params: [{ name: 'itemName', type: 'string', desc: { ru: 'ID предмета', en: 'Item ID' } }], returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'countItem(itemName)', desc: { ru: 'Считает общее количество предмета.', en: 'Counts total amount of item.' }, params: [{ name: 'itemName', type: 'string', desc: { ru: 'ID предмета', en: 'Item ID' } }], returns: { ru: '`int`', en: '`int`' } },
      { name: 'getInventorySize()', desc: { ru: 'Количество слотов инвентаря.', en: 'Number of inventory slots.' }, returns: { ru: '`int`', en: '`int`' } },
      { name: 'isInventoryFull()', desc: { ru: 'Проверяет, полон ли инвентарь.', en: 'Checks if inventory is full.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'pickup([itemType])', desc: { ru: 'Подбирает предмет с земли.', en: 'Picks up item from ground.' }, params: [{ name: 'itemType', type: 'string', desc: { ru: 'Фильтр по типу', en: 'Type filter' }, default: 'any' }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'пустую руку', en: 'empty hand' } },
      { name: 'dropItem()', desc: { ru: 'Выбрасывает предмет из руки.', en: 'Drops item from hand.' }, returns: { ru: '`true`', en: '`true`' } },
    ],
  },
  {
    key: 'carryingEntities',
    methods: [
      { name: 'pickupEntity(uuid)', desc: { ru: 'Поднимает сущность на руки.', en: 'Picks up an entity.' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'pickupNearestPlayer()', desc: { ru: 'Поднимает ближайшего игрока (с разрешением).', en: 'Picks up nearest player (with permission).' }, returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо, разрешение игрока', en: 'fuel, player permission' }, tags: ['fuel'] },
      { name: 'dropEntity()', desc: { ru: 'Опускает несомую сущность.', en: 'Drops the carried entity.' }, returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' } },
      { name: 'throwEntity([power])', desc: { ru: 'Бросает несомую сущность.', en: 'Throws the carried entity.' }, params: [{ name: 'power', type: 'number', desc: { ru: 'Сила броска (0.1 — 2.0)', en: 'Throw power (0.1 — 2.0)' }, default: '1.0' }], returns: { ru: '`true, name` | `false, reason`', en: '`true, name` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'handOverTo(androidUuid)', desc: { ru: 'Передаёт несомую сущность другому андроиду.', en: 'Hands over entity to another android.' }, params: [{ name: 'androidUuid', type: 'string', desc: { ru: 'UUID андроида', en: 'Android UUID' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'isCarrying()', desc: { ru: 'Несёт ли андроид кого-то.', en: 'Is the android carrying something.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'isCarryingPlayer()', desc: { ru: 'Несёт ли андроид игрока.', en: 'Is the android carrying a player.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getCarriedEntity()', desc: { ru: 'Информация о несомой сущности.', en: 'Info about carried entity.' }, returns: { ru: '`table|nil`', en: '`table|nil`' } },
      { name: 'setCarryPermission(playerUuid, allowed)', desc: { ru: 'Устанавливает разрешение игроку быть поднятым.', en: 'Sets carry permission for a player.' }, params: [{ name: 'playerUuid', type: 'string', desc: { ru: 'UUID игрока', en: 'Player UUID' } }, { name: 'allowed', type: 'boolean', desc: { ru: 'Разрешить/запретить', en: 'Allow/deny' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' } },
      { name: 'hasCarryPermission(playerUuid)', desc: { ru: 'Проверяет разрешение игрока.', en: 'Checks player carry permission.' }, params: [{ name: 'playerUuid', type: 'string', desc: { ru: 'UUID игрока', en: 'Player UUID' } }], returns: { ru: '`boolean`', en: '`boolean`' } },
    ],
  },
  {
    key: 'armor',
    methods: [
      { name: 'equipArmor(slotName)', desc: { ru: 'Надевает предмет из руки как броню. Слоты: "head", "helmet", "chest", "chestplate", "legs", "leggings", "feet", "boots"', en: 'Equips item from hand as armor. Slots: "head", "helmet", "chest", "chestplate", "legs", "leggings", "feet", "boots"' }, params: [{ name: 'slotName', type: 'string', desc: { ru: 'Слот брони', en: 'Armor slot' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо', en: 'fuel' }, tags: ['fuel'] },
      { name: 'removeArmor(slotName)', desc: { ru: 'Снимает броню в руку.', en: 'Removes armor to hand.' }, params: [{ name: 'slotName', type: 'string', desc: { ru: 'Слот брони', en: 'Armor slot' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, пустую руку', en: 'fuel, empty hand' }, tags: ['fuel'] },
      { name: 'getArmor(slotName)', desc: { ru: 'Информация о надетой броне.', en: 'Info about equipped armor.' }, params: [{ name: 'slotName', type: 'string', desc: { ru: 'Слот брони', en: 'Armor slot' } }], returns: { ru: '`table|nil`', en: '`table|nil`' } },
      { name: 'getArmorPoints()', desc: { ru: 'Общие очки брони.', en: 'Total armor points.' }, returns: { ru: '`int`', en: '`int`' } },
    ],
  },
  {
    key: 'fuel',
    methods: [
      { name: 'refuel([count])', desc: { ru: 'Заправляет из предмета в руке.', en: 'Refuels from item in hand.' }, params: [{ name: 'count', type: 'int', desc: { ru: 'Количество предметов', en: 'Item count' }, default: 'all' }], returns: { ru: '`true, newLevel` | `false, reason`', en: '`true, newLevel` | `false, reason`' }, code: 'local ok, level = android.refuel()\nif ok then\n    print("Fuel: " .. level)\nend' },
      { name: 'fuelLevel()', desc: { ru: 'Текущий уровень топлива.', en: 'Current fuel level.' }, returns: { ru: '`int`', en: '`int`' } },
      { name: 'getMaxFuel()', desc: { ru: 'Максимальный уровень топлива.', en: 'Maximum fuel level.' }, returns: { ru: '`int` — `10000`', en: '`int` — `10000`' } },
    ],
  },
  {
    key: 'sensors',
    methods: [
      { name: 'getClosestPlayer()', desc: { ru: 'Информация о ближайшем игроке.', en: 'Info about closest player.' }, returns: { ru: '`table|nil`', en: '`table|nil`' } },
      { name: 'getNearbyMobs([type])', desc: { ru: 'Список ближайших мобов.', en: 'List of nearby mobs.' }, params: [{ name: 'type', type: 'string', desc: { ru: 'Фильтр по типу', en: 'Type filter' }, default: 'all' }], returns: { ru: '`table[]`', en: '`table[]`' }, code: 'local zombies = android.getNearbyMobs("minecraft:zombie")' },
      { name: 'getClosestMob([type])', desc: { ru: 'Ближайший моб указанного типа.', en: 'Closest mob of type.' }, params: [{ name: 'type', type: 'string', desc: { ru: 'Фильтр по типу', en: 'Type filter' }, default: 'any' }], returns: { ru: '`table|nil`', en: '`table|nil`' } },
      { name: 'getBlocksOfType(type)', desc: { ru: 'Блоки определённого типа в радиусе поиска.', en: 'Blocks of a type within search radius.' }, params: [{ name: 'type', type: 'string', desc: { ru: 'ID блока', en: 'Block ID' } }], returns: { ru: '`table[]`', en: '`table[]`' }, code: 'local ores = android.getBlocksOfType("minecraft:diamond_ore")' },
      { name: 'scanEntities([radius])', desc: { ru: 'Все сущности в радиусе.', en: 'All entities within radius.' }, params: [{ name: 'radius', type: 'number', desc: { ru: 'Радиус (макс. 64)', en: 'Radius (max 64)' }, default: 'search radius' }], returns: { ru: '`table[]` — макс. 100 сущностей', en: '`table[]` — max 100 entities' }, code: '-- Returns entity:\n{\n    uuid = "...", name = "Zombie",\n    type = "minecraft:zombie",\n    x = 10.5, y = 64.0, z = 20.3,\n    distance = 5.2,\n    health = 20.0, maxHealth = 20.0,\n    isPlayer = false, isHostile = true\n}' },
      { name: 'scanPlayers([radius])', desc: { ru: 'Все игроки в радиусе.', en: 'All players within radius.' }, params: [{ name: 'radius', type: 'number', desc: { ru: 'Радиус (макс. 128)', en: 'Radius (max 128)' }, default: '32.0' }], returns: { ru: '`table[]` — включает поле `isOwner`', en: '`table[]` — includes `isOwner` field' } },
      { name: 'canSeeEntity(uuid)', desc: { ru: 'Проверяет видимость сущности (raycast).', en: 'Checks entity visibility (raycast).' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`boolean` | `false, reason`', en: '`boolean` | `false, reason`' } },
      { name: 'canSeeBlock(x, y, z)', desc: { ru: 'Проверяет видимость блока (raycast).', en: 'Checks block visibility (raycast).' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getDistanceToEntity(uuid)', desc: { ru: 'Расстояние до сущности.', en: 'Distance to entity.' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`number|nil`', en: '`number|nil`' } },
      { name: 'getOwner()', desc: { ru: 'Информация о владельце андроида.', en: 'Info about android owner.' }, returns: { ru: '`table|nil` — `{name, uuid}`', en: '`table|nil` — `{name, uuid}`' } },
      { name: 'getContainerInfo(x, y, z)', desc: { ru: 'Содержимое контейнера.', en: 'Container contents.' }, returns: { ru: '`table|false, reason`', en: '`table|false, reason`' } },
      { name: 'storeHeldItemInContainer(x, y, z, slot)', desc: { ru: 'Кладёт предмет из руки в контейнер.', en: 'Stores held item in container.' }, returns: { ru: '`true`', en: '`true`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '5', tags: ['fuel'] },
      { name: 'grabItemFromContainer(x, y, z, slot)', desc: { ru: 'Берёт предмет из контейнера.', en: 'Grabs item from container.' }, returns: { ru: '`true`', en: '`true`' }, requires: { ru: 'топливо', en: 'fuel' }, limit: '5', tags: ['fuel'] },
    ],
  },
  {
    key: 'worldInspection',
    methods: [
      { name: 'inspect(x, y, z)', desc: { ru: 'Детальная информация о блоке.', en: 'Detailed block info.' }, returns: { ru: '`true, table|"air"` | `false, reason`', en: '`true, table|"air"` | `false, reason`' }, code: '-- Returns:\n{\n    name = "minecraft:oak_door",\n    x = 10, y = 64, z = 20,\n    hardness = 3.0,\n    isSolid = true, isLiquid = false,\n    luminance = 0, hasBlockEntity = false,\n    state = {\n        facing = "north",\n        half = "lower", open = "false"\n    }\n}' },
      { name: 'inspectFront()', desc: { ru: 'Инспектирует блок спереди.', en: 'Inspects block in front.' }, returns: { ru: '`true, table|"air"`', en: '`true, table|"air"`' } },
      { name: 'inspectUp()', desc: { ru: 'Инспектирует блок над головой.', en: 'Inspects block above.' }, returns: { ru: '`true, table|"air"`', en: '`true, table|"air"`' } },
      { name: 'inspectDown()', desc: { ru: 'Инспектирует блок под ногами.', en: 'Inspects block below.' }, returns: { ru: '`true, table|"air"`', en: '`true, table|"air"`' } },
      { name: 'getLight()', desc: { ru: 'Уровень освещения на позиции.', en: 'Light level at position.' }, returns: { ru: '`table` — `{block, sky, total}`', en: '`table` — `{block, sky, total}`' } },
      { name: 'getBiome()', desc: { ru: 'Биом на позиции.', en: 'Biome at position.' }, returns: { ru: '`string` — например `"minecraft:plains"`', en: '`string` — e.g. `"minecraft:plains"`' } },
      { name: 'getWeather()', desc: { ru: 'Текущая погода.', en: 'Current weather.' }, returns: { ru: '`table` — `{isRaining, isThundering}`', en: '`table` — `{isRaining, isThundering}`' } },
      { name: 'getTime()', desc: { ru: 'Время в мире.', en: 'World time.' }, returns: { ru: '`table` — `{dayTime, gameTime, day, isDay, isNight}`', en: '`table` — `{dayTime, gameTime, day, isDay, isNight}`' } },
      { name: 'canSeeSky()', desc: { ru: 'Видит ли андроид небо.', en: 'Can the android see the sky.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getDimension()', desc: { ru: 'Измерение, в котором находится андроид.', en: 'Dimension the android is in.' }, returns: { ru: '`string` — например `"minecraft:overworld"`', en: '`string` — e.g. `"minecraft:overworld"`' } },
    ],
  },
  {
    key: 'positionAndRotation',
    methods: [
      { name: 'getPosition()', desc: { ru: 'Позиция андроида.', en: 'Android position.' }, returns: { ru: '`table`', en: '`table`' }, code: '-- Returns:\n{\n    x = 100.5, y = 64.0, z = 200.3,\n    blockX = 100, blockY = 64, blockZ = 200\n}' },
      { name: 'getRotation()', desc: { ru: 'Вращение андроида.', en: 'Android rotation.' }, returns: { ru: '`table` — `{yaw, pitch, facing}`', en: '`table` — `{yaw, pitch, facing}`' } },
      { name: 'lookAt(x, y, z)', desc: { ru: 'Поворачивает голову к точке.', en: 'Turns head to a point.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'lookAtEntity(uuid)', desc: { ru: 'Поворачивает голову к сущности.', en: 'Turns head to entity.' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID сущности', en: 'Entity UUID' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' } },
      { name: 'turnLeft()', desc: { ru: 'Поворот на 90° влево.', en: 'Turn 90° left.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'turnRight()', desc: { ru: 'Поворот на 90° вправо.', en: 'Turn 90° right.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'turnAround()', desc: { ru: 'Разворот на 180°.', en: 'Turn 180°.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'getDistanceTo(x, y, z)', desc: { ru: 'Расстояние до точки.', en: 'Distance to point.' }, returns: { ru: '`number`', en: '`number`' } },
      { name: 'isOnGround()', desc: { ru: 'На земле ли андроид.', en: 'Is android on ground.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'isInWater()', desc: { ru: 'В воде ли андроид.', en: 'Is android in water.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'isInLava()', desc: { ru: 'В лаве ли андроид.', en: 'Is android in lava.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
    ],
  },
  {
    key: 'statusAndHealth',
    methods: [
      { name: 'getHealth()', desc: { ru: 'Информация о здоровье.', en: 'Health info.' }, returns: { ru: '`table` — `{current, max, armor}`', en: '`table` — `{current, max, armor}`' }, code: 'local h = android.getHealth()\nprint(h.current .. "/" .. h.max)' },
      { name: 'isBurning()', desc: { ru: 'Горит ли андроид.', en: 'Is android burning.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'getVelocity()', desc: { ru: 'Скорость андроида.', en: 'Android velocity.' }, returns: { ru: '`table` — `{x, y, z, speed}`', en: '`table` — `{x, y, z, speed}`' } },
    ],
  },
  {
    key: 'sprintAndSneak',
    methods: [
      { name: 'setSprinting(sprint)', desc: { ru: 'Включает/выключает бег.', en: 'Enables/disables sprinting.' }, params: [{ name: 'sprint', type: 'boolean', desc: { ru: 'Включить/выключить', en: 'Enable/disable' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'setSneaking(sneak)', desc: { ru: 'Включает/выключает приседание.', en: 'Enables/disables sneaking.' }, params: [{ name: 'sneak', type: 'boolean', desc: { ru: 'Включить/выключить', en: 'Enable/disable' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'isSprinting()', desc: { ru: 'Бежит ли андроид.', en: 'Is android sprinting.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'isSneaking()', desc: { ru: 'Приседает ли андроид.', en: 'Is android sneaking.' }, returns: { ru: '`boolean`', en: '`boolean`' } },
    ],
  },
  {
    key: 'communication',
    methods: [
      { name: 'sendChatMessage(message)', desc: { ru: 'Отправляет сообщение в чат.', en: 'Sends a chat message.' }, params: [{ name: 'message', type: 'string', desc: { ru: 'Текст (макс. 256 символов)', en: 'Text (max 256 characters)' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'emote(action)', desc: { ru: 'Выполняет эмоцию (отправляет `* Name action`).', en: 'Performs emote (sends `* Name action`).' }, params: [{ name: 'action', type: 'string', desc: { ru: 'Действие (макс. 128 символов)', en: 'Action (max 128 characters)' } }], returns: { ru: '`true`', en: '`true`' }, code: 'android.emote("dances")\n-- In chat: "* Wall-E dances"' },
      { name: 'changeFace(faceName)', desc: { ru: 'Меняет выражение лица.', en: 'Changes face expression.' }, params: [{ name: 'faceName', type: 'string', desc: { ru: 'Название выражения', en: 'Expression name' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'playSound(soundName)', desc: { ru: 'Проигрывает звук.', en: 'Plays a sound.' }, params: [{ name: 'soundName', type: 'string', desc: { ru: 'ID звука', en: 'Sound ID' } }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, code: 'android.playSound("minecraft:entity.experience_orb.pickup")' },
    ],
  },
  {
    key: 'skinSystem',
    methods: [
      { name: 'setSkinByPlayer(playerName)', desc: { ru: 'Загружает скин по имени игрока (асинхронно).', en: 'Loads skin by player name (async).' }, params: [{ name: 'playerName', type: 'string', desc: { ru: 'Имя игрока (макс. 16 символов)', en: 'Player name (max 16 characters)' } }], returns: { ru: '`true, message`', en: '`true, message`' }, events: { ru: '`"skin_loaded"` — `source, success, [error]`', en: '`"skin_loaded"` — `source, success, [error]`' }, tags: ['async'], code: 'android.setSkinByPlayer("Notch")\n\nlocal event, source, success, err = os.pullEvent("skin_loaded")\nif success then\n    print("Skin loaded!")\nend' },
      { name: 'setSkinByUUID(uuid)', desc: { ru: 'Загружает скин по UUID игрока (асинхронно).', en: 'Loads skin by player UUID (async).' }, params: [{ name: 'uuid', type: 'string', desc: { ru: 'UUID игрока', en: 'Player UUID' } }], returns: { ru: '`true, message`', en: '`true, message`' }, events: { ru: '`"skin_loaded"`', en: '`"skin_loaded"`' }, tags: ['async'] },
      { name: 'setSkinByUrl(url)', desc: { ru: 'Загружает скин по URL (асинхронно).', en: 'Loads skin by URL (async).' }, params: [{ name: 'url', type: 'string', desc: { ru: 'URL на PNG (макс. 512 символов)', en: 'PNG URL (max 512 characters)' } }], returns: { ru: '`true, message`', en: '`true, message`' }, events: { ru: '`"skin_loaded"`', en: '`"skin_loaded"`' }, tags: ['async'] },
      { name: 'clearSkin()', desc: { ru: 'Сбрасывает скин на стандартный.', en: 'Resets skin to default.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'getSkinInfo()', desc: { ru: 'Информация о текущем скине.', en: 'Current skin info.' }, returns: { ru: '`table|nil` — `{url, slim}`', en: '`table|nil` — `{url, slim}`' } },
      { name: 'setSlimModel(slim)', desc: { ru: 'Устанавливает тип модели.', en: 'Sets model type.' }, params: [{ name: 'slim', type: 'boolean', desc: { ru: '`true` = Alex, `false` = Steve', en: '`true` = Alex, `false` = Steve' } }], returns: { ru: '`true`', en: '`true`' } },
    ],
  },
  {
    key: 'fishing',
    methods: [
      { name: 'startFishing([maxCatch], [autoRecast])', desc: { ru: 'Начинает рыбалку.', en: 'Starts fishing.' }, params: [{ name: 'maxCatch', type: 'int', desc: { ru: 'Макс. количество', en: 'Max catch count' }, default: '0 (∞)' }, { name: 'autoRecast', type: 'boolean', desc: { ru: 'Автоперезаброс', en: 'Auto-recast' }, default: 'true' }], returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' }, requires: { ru: 'топливо, удочка в руке, вода рядом', en: 'fuel, fishing rod in hand, water nearby' }, tags: ['fuel'], events: { ru: '`"fish_caught"` — `catchCount`, `"fish_missed"`', en: '`"fish_caught"` — `catchCount`, `"fish_missed"`' }, code: 'android.startFishing(10, true)\n\nwhile true do\n    local event, data = os.pullEvent()\n    if event == "fish_caught" then\n        print("Caught: " .. data)\n    end\n    local info = android.getFishingInfo()\n    if not info or info.catchCount >= 10 then break end\nend' },
      { name: 'stopFishing()', desc: { ru: 'Останавливает рыбалку.', en: 'Stops fishing.' }, returns: { ru: '`true` | `false, reason`', en: '`true` | `false, reason`' } },
      { name: 'getFishingInfo()', desc: { ru: 'Информация о текущей сессии рыбалки.', en: 'Current fishing session info.' }, returns: { ru: '`table|nil`', en: '`table|nil`' }, code: '-- Returns:\n{\n    phase = "waiting",\n    catchCount = 3,\n    hasBobber = true\n}' },
      { name: 'isNearWater()', desc: { ru: 'Есть ли вода рядом (8 блоков).', en: 'Is water nearby (8 blocks).' }, returns: { ru: '`boolean`', en: '`boolean`' } },
    ],
  },
  {
    key: 'persistentData',
    methods: [
      { name: 'dataSave(key, value)', desc: { ru: 'Сохраняет данные по ключу.', en: 'Saves data by key.' }, params: [{ name: 'key', type: 'string', desc: { ru: 'Ключ', en: 'Key' } }, { name: 'value', type: 'any', desc: { ru: 'Значение', en: 'Value' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'dataLoad(key, [default])', desc: { ru: 'Загружает данные по ключу.', en: 'Loads data by key.' }, params: [{ name: 'key', type: 'string', desc: { ru: 'Ключ', en: 'Key' } }, { name: 'default', type: 'any', desc: { ru: 'Значение по умолчанию', en: 'Default value' }, default: 'nil' }], returns: { ru: '`any`', en: '`any`' } },
      { name: 'dataExists(key)', desc: { ru: 'Проверяет существование ключа.', en: 'Checks if key exists.' }, params: [{ name: 'key', type: 'string', desc: { ru: 'Ключ', en: 'Key' } }], returns: { ru: '`boolean`', en: '`boolean`' } },
      { name: 'dataDelete(key)', desc: { ru: 'Удаляет данные по ключу.', en: 'Deletes data by key.' }, params: [{ name: 'key', type: 'string', desc: { ru: 'Ключ', en: 'Key' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'dataClear()', desc: { ru: 'Очищает все данные.', en: 'Clears all data.' }, returns: { ru: '`true`', en: '`true`' } },
      { name: 'dataList()', desc: { ru: 'Список всех ключей.', en: 'List of all keys.' }, returns: { ru: '`table`', en: '`table`' } },
      { name: 'dataGetAll()', desc: { ru: 'Все данные.', en: 'All data.' }, returns: { ru: '`table`', en: '`table`' } },
    ],
  },
  {
    key: 'debug',
    methods: [
      { name: 'log(message)', desc: { ru: 'Пишет информационное сообщение в серверный лог.', en: 'Writes info message to server log.' }, params: [{ name: 'message', type: 'string', desc: { ru: 'Текст (макс. 512 символов)', en: 'Text (max 512 characters)' } }], returns: { ru: '`true`', en: '`true`' }, code: 'android.log("Starting work")\n-- [Android Wall-E] Starting work' },
      { name: 'logWarning(message)', desc: { ru: 'Пишет предупреждение в серверный лог.', en: 'Writes warning to server log.' }, params: [{ name: 'message', type: 'string', desc: { ru: 'Текст (макс. 512 символов)', en: 'Text (max 512 characters)' } }], returns: { ru: '`true`', en: '`true`' } },
      { name: 'logError(message)', desc: { ru: 'Пишет ошибку в серверный лог.', en: 'Writes error to server log.' }, params: [{ name: 'message', type: 'string', desc: { ru: 'Текст (макс. 512 символов)', en: 'Text (max 512 characters)' } }], returns: { ru: '`true`', en: '`true`' } },
    ],
  },
];

/* ─── Limitations data ─── */
const limitations = [
  { key: 'meleeRange', value: '4 blocks' },
  { key: 'shootingRange', value: '32 blocks' },
  { key: 'breakRange', value: '6 blocks' },
  { key: 'placeRange', value: '5 blocks' },
  { key: 'interactRange', value: '5 blocks' },
  { key: 'navRange', value: '64 blocks' },
  { key: 'scanRange', value: '64 blocks' },
  { key: 'maxEntities', value: '100' },
  { key: 'maxNameLength', value: '32' },
  { key: 'maxMessageLength', value: '256' },
  { key: 'maxLogLength', value: '512' },
  { key: 'maxFuel', value: '10000' },
];

/* ─── MethodCard component ─── */
function MethodCard({ method, lang }: { method: MethodDef; lang: Language }) {
  const [open, setOpen] = useState(false);
  const t = translations[lang];

  return (
    <div
      className={`method-card mb-3 overflow-hidden ${open ? 'expanded' : ''}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#1c2128] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <code className="text-[#58a6ff] font-mono text-sm font-semibold whitespace-nowrap">
            {method.name}
          </code>
          <span className="text-[#8b949e] text-sm truncate hidden sm:inline">
            — {method.desc[lang]}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {method.tags?.includes('fuel') && (
            <span className="tag tag-fuel">⛽ {t.fuel}</span>
          )}
          {method.tags?.includes('async') && (
            <span className="tag tag-async">⚡ async</span>
          )}
          {method.limit && (
            <span className="tag tag-range">📏 {method.limit}b</span>
          )}
          <svg
            className={`w-4 h-4 text-[#8b949e] transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[#30363d] pt-3 space-y-3">
          <p className="text-[#c9d1d9] text-sm">{method.desc[lang]}</p>

          {method.params && method.params.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#8b949e] uppercase mb-2">{t.parameters}</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[#8b949e] text-left text-xs border-b border-[#30363d]">
                      <th className="pb-1 pr-4">{t.parameter}</th>
                      <th className="pb-1 pr-4">{t.type}</th>
                      {method.params.some(p => p.default) && <th className="pb-1 pr-4">{t.default}</th>}
                      <th className="pb-1">{t.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {method.params.map((p, i) => (
                      <tr key={i} className="border-b border-[#21262d]">
                        <td className="py-1.5 pr-4"><code className="text-[#f0883e] text-xs">{p.name}</code></td>
                        <td className="py-1.5 pr-4"><code className="text-[#a371f7] text-xs">{p.type}</code></td>
                        {method.params!.some(pp => pp.default) && (
                          <td className="py-1.5 pr-4 text-[#8b949e] text-xs">{p.default || '—'}</td>
                        )}
                        <td className="py-1.5 text-[#c9d1d9] text-xs">{p.desc[lang]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold text-[#8b949e] uppercase mb-1">{t.returns}</h4>
            <p className="text-sm text-[#c9d1d9]">{method.returns[lang]}</p>
          </div>

          {method.requires && (
            <div>
              <h4 className="text-xs font-semibold text-[#8b949e] uppercase mb-1">{t.requires}</h4>
              <p className="text-sm text-[#d29922]">{method.requires[lang]}</p>
            </div>
          )}

          {method.exceptions && (
            <div>
              <h4 className="text-xs font-semibold text-[#8b949e] uppercase mb-1">{t.exceptions}</h4>
              <p className="text-sm text-[#f85149]">{method.exceptions[lang]}</p>
            </div>
          )}

          {method.events && (
            <div>
              <h4 className="text-xs font-semibold text-[#8b949e] uppercase mb-1">Events</h4>
              <p className="text-sm text-[#a371f7]">{method.events[lang]}</p>
            </div>
          )}

          {method.code && (
            <div>
              <h4 className="text-xs font-semibold text-[#8b949e] uppercase mb-2">{t.example}</h4>
              <div className="code-block">
                <pre className="text-[#c9d1d9]"><code>{method.code}</code></pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main App ─── */
export function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const t = translations[lang];
  const cats = t.categories as Record<string, string>;
  const icons = t.categoryIcons as Record<string, string>;
  const limLabels = t.limitationLabels as Record<string, string>;

  const filtered = useMemo(() => {
    if (!search.trim()) return apiData;
    const q = search.toLowerCase();
    return apiData
      .map(cat => ({
        ...cat,
        methods: cat.methods.filter(
          m =>
            m.name.toLowerCase().includes(q) ||
            m.desc[lang].toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.methods.length > 0);
  }, [search, lang]);

  const totalMethods = useMemo(
    () => apiData.reduce((sum, c) => sum + c.methods.length, 0),
    []
  );

  const scrollTo = useCallback((key: string) => {
    document.getElementById(`cat-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d] backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-[#8b949e] hover:text-white p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-white whitespace-nowrap">
              🤖 CC: Android Rework
            </h1>
            <span className="hidden sm:inline text-xs bg-[#238636] text-white px-2 py-0.5 rounded-full font-medium">
              API v1.0
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-9 pr-3 py-2 text-sm text-[#c9d1d9] placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] transition-colors"
              />
            </div>

            <div className="flex bg-[#21262d] rounded-lg overflow-hidden border border-[#30363d]">
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${lang === 'ru' ? 'bg-[#58a6ff] text-white' : 'text-[#8b949e] hover:text-white'}`}
              >
                RU
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${lang === 'en' ? 'bg-[#58a6ff] text-white' : 'text-[#8b949e] hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-64 bg-[#0d1117] lg:bg-transparent border-r border-[#30363d] lg:border-r-0 overflow-y-auto z-40 transition-transform lg:transform-none lg:block flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <nav className="p-4">
            <h2 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-3">
              {t.tableOfContents}
            </h2>
            <ul className="space-y-0.5">
              {apiData.map(cat => (
                <li key={cat.key}>
                  <button
                    onClick={() => scrollTo(cat.key)}
                    className="nav-link w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-[#161b22] transition-colors flex items-center gap-2"
                  >
                    <span>{icons[cat.key]}</span>
                    <span className="truncate">{cats[cat.key]}</span>
                    <span className="ml-auto text-xs text-[#484f58]">{cat.methods.length}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-[#21262d] mt-2">
                <button
                  onClick={() => scrollTo('limitations')}
                  className="nav-link w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-[#161b22] transition-colors flex items-center gap-2"
                >
                  <span>⚠️</span>
                  <span>{t.limitations}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('summary')}
                  className="nav-link w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-[#161b22] transition-colors flex items-center gap-2"
                >
                  <span>📊</span>
                  <span>{t.methodSummary}</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 py-6 lg:pl-8">
          {/* Hero */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#161b22] to-[#1c2128] border border-[#30363d]">
            <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
            <p className="text-[#8b949e] text-sm leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-[#8b949e]">
              <span>📦 {t.totalMethods}: <strong className="text-[#58a6ff]">{totalMethods}</strong></span>
              <span>📂 {t.category}: <strong className="text-[#58a6ff]">{apiData.length}</strong></span>
            </div>
          </div>

          {/* Categories */}
          {filtered.map(cat => (
            <section key={cat.key} id={`cat-${cat.key}`} className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#21262d]">
                <span className="text-2xl">{icons[cat.key]}</span>
                <h3 className="text-xl font-bold text-white">
                  {cats[cat.key]}
                </h3>
                <span className="text-xs bg-[#21262d] text-[#8b949e] px-2 py-0.5 rounded-full">
                  {cat.methods.length}
                </span>
              </div>
              {cat.methods.map((m, i) => (
                <MethodCard key={i} method={m} lang={lang} />
              ))}
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#8b949e]">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-lg">{lang === 'ru' ? 'Методы не найдены' : 'No methods found'}</p>
            </div>
          )}

          {/* Limitations */}
          <section id="cat-limitations" className="mb-10 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#21262d]">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-xl font-bold text-white">{t.limitations}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#8b949e] border-b border-[#30363d]">
                    <th className="pb-2 pr-8">{t.parameter}</th>
                    <th className="pb-2">{t.value}</th>
                  </tr>
                </thead>
                <tbody>
                  {limitations.map((lim, i) => (
                    <tr key={i} className="border-b border-[#21262d]">
                      <td className="py-2 pr-8 text-[#c9d1d9]">{limLabels[lim.key]}</td>
                      <td className="py-2"><code className="text-[#58a6ff] bg-[#161b22] px-2 py-0.5 rounded text-xs">{lim.value}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Summary */}
          <section id="cat-summary" className="mb-10 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#21262d]">
              <span className="text-2xl">📊</span>
              <h3 className="text-xl font-bold text-white">{t.methodSummary}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#8b949e] border-b border-[#30363d]">
                    <th className="pb-2 pr-8">{t.category}</th>
                    <th className="pb-2">{t.count}</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((cat, i) => (
                    <tr key={i} className="border-b border-[#21262d]">
                      <td className="py-2 pr-8 text-[#c9d1d9]">
                        <span className="mr-2">{icons[cat.key]}</span>
                        {cats[cat.key]}
                      </td>
                      <td className="py-2">
                        <span className="text-[#58a6ff] font-mono">{cat.methods.length}</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="py-2 pr-8 text-white">{t.totalMethods}</td>
                    <td className="py-2 text-[#3fb950] font-mono">{totalMethods}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-[#484f58] text-xs py-8 border-t border-[#21262d]">
            CC: Android Rework — API Wiki • {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </div>
  );
}
