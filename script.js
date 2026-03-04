// ===== TRANSLATIONS =====
const T = {
  ru: {
    title: "CC: Android Rework API",
    subtitle: "API Reference",
    heroTitle: "Android API Reference",
    heroDesc: "Полный справочник всех методов CcAndroidAPI для управления андроидами в CC: Android Rework. Нажмите на метод для просмотра подробностей и примеров кода.",
    search: "Поиск методов...",
    methods: "методов",
    noResults: "Ничего не найдено",
    noResultsDesc: "Попробуйте другой поисковый запрос",
    params: "Параметры",
    returns: "Возвращает",
    requires: "Требует",
    exceptions: "Исключения",
    events: "События",
    example: "Пример",
    copy: "Копировать",
    copied: "Скопировано!",
    limits: "Ограничения",
    summary: "Сводка методов",
    category: "Категория",
    count: "Количество",
    total: "Итого",
    value: "Значение",
    parameter: "Параметр",
    param: "Параметр",
    type: "Тип",
    default: "По умолчанию",
    description: "Описание",
    categories: {
      tasks: "📋 Управление задачами",
      self: "🤖 Информация о себе",
      combat: "⚔️ Боевая система",
      navigation: "🧭 Навигация (Pathfinding)",
      movement: "🚶 Простое движение",
      digging_move: "⛏️ Движение с автокопанием",
      water: "🌊 Вода, лестницы, ползание",
      detection: "🔍 Детекция блоков",
      mining: "🔨 Копание и строительство",
      interaction: "🤝 Взаимодействие",
      inventory: "🎒 Инвентарь",
      carrying: "🏋️ Переноска сущностей",
      armor: "🛡️ Броня",
      fuel: "⛽ Топливо",
      sensors: "📡 Сенсоры и сканирование",
      events: "📢 События",
      inspection: "🌍 Инспекция мира",
      position: "📍 Позиция и вращение",
      status: "💚 Статус и здоровье",
      sprint: "🏃 Бег и приседание",
      chat: "💬 Общение",
      skins: "🎨 Система скинов",
      fishing: "🎣 Рыбалка",
      data: "💾 Постоянные данные",
      debug: "🐛 Отладка"
    }
  },
  en: {
    title: "CC: Android Rework API",
    subtitle: "API Reference",
    heroTitle: "Android API Reference",
    heroDesc: "Complete reference of all CcAndroidAPI methods for controlling androids in CC: Android Rework. Click on a method to view details and code examples.",
    search: "Search methods...",
    methods: "methods",
    noResults: "Nothing found",
    noResultsDesc: "Try a different search query",
    params: "Parameters",
    returns: "Returns",
    requires: "Requires",
    exceptions: "Exceptions",
    events: "Events",
    example: "Example",
    copy: "Copy",
    copied: "Copied!",
    limits: "Limitations",
    summary: "Methods Summary",
    category: "Category",
    count: "Count",
    total: "Total",
    value: "Value",
    parameter: "Parameter",
    param: "Parameter",
    type: "Type",
    default: "Default",
    description: "Description",
    categories: {
      tasks: "📋 Task Management",
      self: "🤖 Self Info",
      combat: "⚔️ Combat System",
      navigation: "🧭 Navigation (Pathfinding)",
      movement: "🚶 Simple Movement",
      digging_move: "⛏️ Movement with Auto-Mining",
      water: "🌊 Water, Ladders, Crawling",
      detection: "🔍 Block Detection",
      mining: "🔨 Mining & Building",
      interaction: "🤝 Interaction",
      inventory: "🎒 Inventory",
      carrying: "🏋️ Carrying Entities",
      armor: "🛡️ Armor",
      fuel: "⛽ Fuel",
      sensors: "📡 Sensors & Scanning",
      events: "📢 Events",
      inspection: "🌍 World Inspection",
      position: "📍 Position & Rotation",
      status: "💚 Status & Health",
      sprint: "🏃 Sprinting & Sneaking",
      chat: "💬 Communication",
      skins: "🎨 Skin System",
      fishing: "🎣 Fishing",
      data: "💾 Persistent Data",
      debug: "🐛 Debug & Logging"
    }
  }
};
// ===== API DATA =====
const apiData = {
  tasks: [
    { name: "currentTask()", desc: { ru: "Возвращает имя текущей выполняемой задачи.", en: "Returns the name of the current running task." }, returns: "string|nil", example: 'local task = android.currentTask()\nif task then\n    print("Running: " .. task)\nend' },
    { name: "isTaskRunning()", desc: { ru: "Проверяет, выполняется ли какая-либо задача.", en: "Checks if any task is currently running." }, returns: "boolean", example: 'while android.isTaskRunning() do\n    os.sleep(0.5)\nend\nprint("Done!")' },
    { name: "cancelTask()", desc: { ru: "Отменяет текущую задачу.", en: "Cancels the current task." }, returns: "true" },
    { name: "stop()", desc: { ru: "Отменяет текущую задачу и останавливает навигацию.", en: "Cancels current task and stops navigation." }, returns: "true" }
  ],
  self: [
    { name: "getSelf()", desc: { ru: "Возвращает полную информацию об андроиде.", en: "Returns full android info." }, returns: "table" },
    { name: "getAndroidType()", desc: { ru: "Возвращает тип андроида.", en: "Returns the android type." }, returns: 'string — "normal", "advanced", "command"' },
    { name: "getName()", desc: { ru: "Возвращает имя андроида.", en: "Returns the android name." }, returns: "string" },
    { name: "setName(name)", desc: { ru: "Устанавливает имя андроида (макс. 32 символа).", en: "Sets the android name (max 32 chars)." }, returns: "true", params: [{ name: "name", type: "string", desc: { ru: "Новое имя", en: "New name" } }], exceptions: { ru: "LuaException если имя слишком длинное", en: "LuaException if name is too long" }, example: 'android.setName("Wall-E")' },
    { name: "isAlive()", desc: { ru: "Проверяет, жив ли андроид.", en: "Checks if android is alive." }, returns: "boolean" }
  ],
  combat: [
    { name: "attackFront()", desc: { ru: "Атакует ближайшую сущность перед собой (конус ~45°).", en: "Attacks nearest entity in front (~45° cone)." }, returns: "true, name | false, reason", tags: ["fuel"], example: 'local ok, name = android.attackFront()\nif ok then\n    print("Attacking " .. name)\nend' },
    { name: "attackUp()", desc: { ru: "Атакует ближайшую видимую сущность сверху.", en: "Attacks nearest visible entity above." }, returns: "true, name | false, reason", tags: ["fuel"] },
    { name: "attackDown()", desc: { ru: "Атакует ближайшую видимую сущность снизу.", en: "Attacks nearest visible entity below." }, returns: "true, name | false, reason", tags: ["fuel"] },
    { name: "attackEntity(uuid)", desc: { ru: "Атакует конкретную сущность по UUID. Макс. 4 блока.", en: "Attacks specific entity by UUID. Max 4 blocks." }, returns: "true, name | false, reason", tags: ["fuel", "range"], params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }], example: 'local mobs = android.getNearbyMobs("minecraft:zombie")\nif mobs and #mobs > 0 then\n    android.attackEntity(mobs[1].uuid)\nend' },
    { name: "shootBow([power])", desc: { ru: "Стреляет из лука по ближайшей видимой цели впереди. Макс. 32 блока.", en: "Shoots bow at nearest visible target ahead. Max 32 blocks." }, returns: "true, name | false, reason", tags: ["fuel", "range"], params: [{ name: "power", type: "number", default: "1.0", desc: { ru: "Сила выстрела (0.1—1.0)", en: "Shot power (0.1—1.0)" } }], example: 'android.shootBow(0.8)' },
    { name: "getAttackDamage()", desc: { ru: "Возвращает базовый урон атаки.", en: "Returns base attack damage." }, returns: "number" },
    { name: "getReach()", desc: { ru: "Возвращает максимальную дальность ближнего боя.", en: "Returns max melee reach." }, returns: "number — 4.0" }
  ],
  navigation: [
    { name: "moveTo(x, y, z)", desc: { ru: "Идёт к блоку через pathfinding. Макс. 64 блока.", en: "Moves to block via pathfinding. Max 64 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "x, y, z", type: "int", desc: { ru: "Координаты", en: "Coordinates" } }], example: 'android.moveTo(100, 64, 200)\n-- or\nandroid.moveTo({x=100, y=64, z=200})' },
    { name: "goTo(entityUUID)", desc: { ru: "Идёт к сущности через pathfinding. Макс. 64 блока.", en: "Moves to entity via pathfinding. Max 64 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "entityUUID", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }], example: 'local player = android.getClosestPlayer()\nif player then\n    android.goTo(player.uuid)\nend' },
    { name: "canReach(x, y, z)", desc: { ru: "Проверяет, существует ли путь до позиции.", en: "Checks if path to position exists." }, returns: "boolean" },
    { name: "getPathLength(x, y, z)", desc: { ru: "Возвращает длину пути до позиции.", en: "Returns path length to position." }, returns: "number|nil" }
  ],
  movement: [
    { name: "forward()", desc: { ru: "Шаг вперёд на 1 блок.", en: "Step forward 1 block." }, returns: "true | false, reason", tags: ["fuel"], example: 'for i = 1, 10 do\n    local ok, err = android.forward()\n    if not ok then\n        print("Blocked: " .. err)\n        break\n    end\nend' },
    { name: "back()", desc: { ru: "Шаг назад на 1 блок.", en: "Step back 1 block." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "up()", desc: { ru: "Движение вверх (прыжок).", en: "Move up (jump)." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "down()", desc: { ru: "Движение вниз на 1 блок.", en: "Move down 1 block." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "jump()", desc: { ru: "Прыжок на месте (без горизонтального движения).", en: "Jump in place (no horizontal movement)." }, returns: "true | false, reason", tags: ["fuel"] }
  ],
  digging_move: [
    { name: "stepForward()", desc: { ru: "Шаг вперёд с автоматическим копанием блоков на пути.", en: "Step forward with auto-mining blocks in path." }, returns: 'true | true, "digging" | false, reason', tags: ["fuel"], example: 'for i = 1, 100 do\n    local ok, status = android.stepForward()\n    if not ok then break end\n    if status == "digging" then\n        while android.isTaskRunning() do os.sleep(0.1) end\n    end\nend' },
    { name: "stepUp()", desc: { ru: "Шаг вверх с автокопанием.", en: "Step up with auto-mining." }, returns: 'true | true, "digging" | true, "jumping" | false, reason', tags: ["fuel"] },
    { name: "stepDown()", desc: { ru: "Шаг вниз с автокопанием.", en: "Step down with auto-mining." }, returns: 'true | true, "digging" | false, reason', tags: ["fuel"] },
    { name: "climbUp()", desc: { ru: "Подъём (прыжок + вперёд) с автокопанием 3 блоков.", en: "Climb up (jump + forward) with auto-mining 3 blocks." }, returns: 'true | true, "digging" | true, "climbing" | false, reason', tags: ["fuel"] },
    { name: "tunnelForward()", desc: { ru: "Прокапывает туннель 1×2 и движется вперёд.", en: "Digs 1×2 tunnel and moves forward." }, returns: 'true | true, "digging_low" | true, "digging_high" | false, reason', tags: ["fuel"], example: 'for i = 1, 50 do\n    local ok, status = android.tunnelForward()\n    if not ok then break end\n    while android.isTaskRunning() do os.sleep(0.1) end\nend' }
  ],
  water: [
    { name: "swim()", desc: { ru: "Плывёт в направлении взгляда.", en: "Swims in look direction." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "dive()", desc: { ru: "Погружается вниз в воде.", en: "Dives down in water." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "surfaceFromWater()", desc: { ru: "Всплывает на поверхность.", en: "Surfaces from water." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "climbLadder()", desc: { ru: "Карабкается вверх по лестнице/лозе.", en: "Climbs up ladder/vine." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "crawl()", desc: { ru: "Ползёт вперёд (для пространств 1 блок высотой).", en: "Crawls forward (for 1-block height spaces)." }, returns: "true", tags: ["fuel"] },
    { name: "isSwimming()", desc: { ru: "Проверяет, плывёт ли андроид.", en: "Checks if android is swimming." }, returns: "boolean" },
    { name: "isClimbing()", desc: { ru: "Проверяет, карабкается ли по лестнице.", en: "Checks if android is climbing." }, returns: "boolean" },
    { name: "getSwimDirection()", desc: { ru: "Возвращает направление плавания.", en: "Returns swim direction." }, returns: "table|nil — {x, y, z}" }
  ],
  detection: [
    { name: "detectFront()", desc: { ru: "Есть ли блок спереди (не воздух).", en: "Is there a block in front (not air)." }, returns: "boolean", example: 'if android.detectFront() then\n    android.digFront()\nend' },
    { name: "detectUp()", desc: { ru: "Есть ли блок сверху.", en: "Is there a block above." }, returns: "boolean" },
    { name: "detectDown()", desc: { ru: "Есть ли блок снизу.", en: "Is there a block below." }, returns: "boolean" },
    { name: "getBlockInFront()", desc: { ru: "Информация о блоке спереди.", en: "Info about block in front." }, returns: 'table|"air"', example: '-- Returns:\n{\n    name = "minecraft:stone",\n    x = 10, y = 64, z = 20,\n    hardness = 1.5\n}' },
    { name: "getBlockAbove()", desc: { ru: "Информация о блоке над головой.", en: "Info about block above." }, returns: 'table|"air"' },
    { name: "getBlockBelow()", desc: { ru: "Информация о блоке под ногами.", en: "Info about block below." }, returns: 'table|"air"' }
  ],
  mining: [
    { name: "digFront()", desc: { ru: "Копает блок спереди.", en: "Digs block in front." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "digUp()", desc: { ru: "Копает блок сверху.", en: "Digs block above." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "digDown()", desc: { ru: "Копает блок снизу.", en: "Digs block below." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "breakBlock(x, y, z)", desc: { ru: "Ломает блок по координатам. Макс. 6 блоков.", en: "Breaks block at coordinates. Max 6 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "x, y, z", type: "int", desc: { ru: "Координаты", en: "Coordinates" } }], example: 'android.breakBlock(100, 64, 200)\nwhile android.isTaskRunning() do os.sleep(0.1) end' },
    { name: "placeFront()", desc: { ru: "Ставит блок из руки спереди.", en: "Places block from hand in front." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "placeUp()", desc: { ru: "Ставит блок сверху.", en: "Places block above." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "placeDown()", desc: { ru: "Ставит блок снизу.", en: "Places block below." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "placeBlock(x, y, z)", desc: { ru: "Ставит блок по координатам. Макс. 5 блоков.", en: "Places block at coordinates. Max 5 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "compareBlock(x, y, z)", desc: { ru: "Сравнивает блок в мире с блоком в руке.", en: "Compares world block with block in hand." }, returns: "boolean" }
  ],
  interaction: [
    { name: "useBlock(x, y, z)", desc: { ru: "Правый клик по блоку. Макс. 5 блоков.", en: "Right click on block. Max 5 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "useEntity(uuid)", desc: { ru: "Правый клик по сущности. Макс. 5 блоков.", en: "Right click on entity. Max 5 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "useItem()", desc: { ru: "Использует предмет в руке. Еда → лечение.", en: "Uses item in hand. Food → healing." }, returns: "true, healing | false, reason", tags: ["fuel"], example: 'local ok, healing = android.useItem()\nif ok then\n    print("Healed " .. healing .. " HP")\nend' },
    { name: "useItemOnBlock(x, y, z)", desc: { ru: "Использует предмет на блоке. Макс. 5 блоков.", en: "Uses item on block. Max 5 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "useItemOnEntity(uuid)", desc: { ru: "Использует предмет на сущности. Макс. 5 блоков.", en: "Uses item on entity. Max 5 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"] }
  ],
  inventory: [
    { name: "getHandInfo(hand)", desc: { ru: "Информация о предмете в руке.", en: "Info about item in hand." }, returns: "table|nil", params: [{ name: "hand", type: "string", desc: { ru: '"right"/"main" или "left"/"off"', en: '"right"/"main" or "left"/"off"' } }], example: '-- Returns:\n{\n    name = "minecraft:diamond_pickaxe",\n    count = 1, maxCount = 1,\n    displayName = "Diamond Pickaxe",\n    damage = 50, maxDamage = 1561\n}' },
    { name: "swapHands()", desc: { ru: "Меняет предметы между руками.", en: "Swaps items between hands." }, returns: "true" },
    { name: "storeItem(index)", desc: { ru: "Кладёт предмет из руки в сл��т инвентаря (0-based).", en: "Stores item from hand to inventory slot (0-based)." }, returns: "true | false, reason", params: [{ name: "index", type: "int", desc: { ru: "Индекс слота (0-based)", en: "Slot index (0-based)" } }] },
    { name: "equipSlot(index)", desc: { ru: "Берёт предмет из слота в руку (0-based). Требует пустую руку.", en: "Takes item from slot to hand (0-based). Requires empty hand." }, returns: "true | false, reason", params: [{ name: "index", type: "int", desc: { ru: "Индекс слота (0-based)", en: "Slot index (0-based)" } }] },
    { name: "getSlotInfo(index)", desc: { ru: "Информация о предмете в слоте (0-based).", en: "Info about item in slot (0-based)." }, returns: "table|nil", params: [{ name: "index", type: "int", desc: { ru: "Индекс слота (0-based)", en: "Slot index (0-based)" } }] },
    { name: "select(slot)", desc: { ru: "Выбирает слот (turtle-стиль, 1-based).", en: "Selects slot (turtle-style, 1-based)." }, returns: "true", params: [{ name: "slot", type: "int", desc: { ru: "Номер слота (1-based)", en: "Slot number (1-based)" } }] },
    { name: "getSelectedSlot()", desc: { ru: "Текущий выбранный слот.", en: "Current selected slot." }, returns: "int (1-based)" },
    { name: "getItemDetail([slot])", desc: { ru: "Детальная информация о предмете в слоте.", en: "Detailed info about item in slot." }, returns: "table|nil", params: [{ name: "slot", type: "int", default: "selected", desc: { ru: "Номер слота (1-based)", en: "Slot number (1-based)" } }] },
    { name: "getItemCount([slot])", desc: { ru: "Количество предметов в слоте.", en: "Item count in slot." }, returns: "int", params: [{ name: "slot", type: "int", default: "selected", desc: { ru: "Номер слота (1-based)", en: "Slot number (1-based)" } }] },
    { name: "getItemSpace([slot])", desc: { ru: "Свободное место в слоте.", en: "Free space in slot." }, returns: "int", params: [{ name: "slot", type: "int", default: "selected", desc: { ru: "Номер слота (1-based)", en: "Slot number (1-based)" } }] },
    { name: "transferTo(toSlot, [count])", desc: { ru: "Перемещает предметы из выбранного слота в указанный.", en: "Transfers items from selected slot to target." }, returns: "boolean", params: [{ name: "toSlot", type: "int", desc: { ru: "Целевой слот (1-based)", en: "Target slot (1-based)" } }, { name: "count", type: "int", default: "all", desc: { ru: "Количество", en: "Count" } }] },
    { name: "list()", desc: { ru: "Список всех непустых слотов.", en: "List of all non-empty slots." }, returns: "table — {[slot] = {name, count}, ...}", example: 'local items = android.list()\nfor slot, item in pairs(items) do\n    print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)\nend' },
    { name: "findItem(itemName)", desc: { ru: "Ищет предмет в инвентаре.", en: "Finds item in inventory." }, returns: '"main"|"off"|int|nil', params: [{ name: "itemName", type: "string", desc: { ru: "ID предмета", en: "Item ID" } }], example: 'local where = android.findItem("minecraft:diamond")\nif where == "main" then\n    print("In hand!")\nelseif type(where) == "number" then\n    android.equipSlot(where - 1)\nend' },
    { name: "hasItem(itemName)", desc: { ru: "Проверяет наличие предмета.", en: "Checks if item exists." }, returns: "boolean", params: [{ name: "itemName", type: "string", desc: { ru: "ID предмета", en: "Item ID" } }] },
    { name: "countItem(itemName)", desc: { ru: "Считает общее количество предмета.", en: "Counts total item amount." }, returns: "int", params: [{ name: "itemName", type: "string", desc: { ru: "ID предмета", en: "Item ID" } }] },
    { name: "getInventorySize()", desc: { ru: "Количество слотов инвентаря.", en: "Inventory slot count." }, returns: "int" },
    { name: "isInventoryFull()", desc: { ru: "Проверяет, полон ли инвентарь.", en: "Checks if inventory is full." }, returns: "boolean" },
    { name: "pickup([itemType])", desc: { ru: "Подбирает предмет с земли. Требует пустую руку.", en: "Picks up item from ground. Requires empty hand." }, returns: "true | false, reason", params: [{ name: "itemType", type: "string", default: "any", desc: { ru: "Фильтр по типу", en: "Type filter" } }] },
    { name: "dropItem()", desc: { ru: "Выбрасывает предмет из руки.", en: "Drops item from hand." }, returns: "result" }
  ],
  carrying: [
    { name: "pickupEntity(uuid)", desc: { ru: "Поднимает сущность на руки.", en: "Picks up entity." }, returns: "true, name | false, reason", tags: ["fuel"], params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "pickupNearestPlayer()", desc: { ru: "Поднимает ближайшего игрока (с разрешением).", en: "Picks up nearest player (with permission)." }, returns: "true, name | false, reason", tags: ["fuel"] },
    { name: "dropEntity()", desc: { ru: "Опускает несомую сущность.", en: "Drops carried entity." }, returns: "true, name | false, reason" },
    { name: "throwEntity([power])", desc: { ru: "Бросает несомую сущность.", en: "Throws carried entity." }, returns: "true, name | false, reason", tags: ["fuel"], params: [{ name: "power", type: "number", default: "1.0", desc: { ru: "Сила броска (0.1—2.0)", en: "Throw power (0.1—2.0)" } }] },
    { name: "handOverTo(androidUuid)", desc: { ru: "Передаёт несомую сущность другому андроиду.", en: "Hands over carried entity to another android." }, returns: "true | false, reason", tags: ["fuel"], params: [{ name: "androidUuid", type: "string", desc: { ru: "UUID андроида", en: "Android UUID" } }] },
    { name: "isCarrying()", desc: { ru: "Несёт ли андроид кого-то.", en: "Is android carrying someone." }, returns: "boolean" },
    { name: "isCarryingPlayer()", desc: { ru: "Несёт ли андроид игрока.", en: "Is android carrying a player." }, returns: "boolean" },
    { name: "getCarriedEntity()", desc: { ru: "Информация о несомой сущности.", en: "Info about carried entity." }, returns: "table|nil" },
    { name: "setCarryPermission(playerUuid, allowed)", desc: { ru: "Устанавливает разрешение игроку быть поднятым.", en: "Sets player carry permission." }, returns: "true | false, reason", params: [{ name: "playerUuid", type: "string", desc: { ru: "UUID игрока", en: "Player UUID" } }, { name: "allowed", type: "boolean", desc: { ru: "Разрешить/запретить", en: "Allow/deny" } }] },
    { name: "hasCarryPermission(playerUuid)", desc: { ru: "Проверяет разрешение игрока.", en: "Checks player permission." }, returns: "boolean", params: [{ name: "playerUuid", type: "string", desc: { ru: "UUID игрока", en: "Player UUID" } }] }
  ],
  armor: [
    { name: "equipArmor(slotName)", desc: { ru: "Надевает предмет из руки как броню. Слоты: head, chest, legs, feet.", en: "Equips item from hand as armor. Slots: head, chest, legs, feet." }, returns: "true | false, reason", tags: ["fuel"], params: [{ name: "slotName", type: "string", desc: { ru: '"head", "chest", "legs", "feet"', en: '"head", "chest", "legs", "feet"' } }] },
    { name: "removeArmor(slotName)", desc: { ru: "Снимает броню в руку. Требует пустую руку.", en: "Removes armor to hand. Requires empty hand." }, returns: "true | false, reason", tags: ["fuel"], params: [{ name: "slotName", type: "string", desc: { ru: "Слот брони", en: "Armor slot" } }] },
    { name: "getArmor(slotName)", desc: { ru: "Информация о надетой броне.", en: "Info about equipped armor." }, returns: "table|nil", params: [{ name: "slotName", type: "string", desc: { ru: "Слот брони", en: "Armor slot" } }] },
    { name: "getArmorPoints()", desc: { ru: "Общие очки брони.", en: "Total armor points." }, returns: "int" }
  ],
  fuel: [
    { name: "refuel([count])", desc: { ru: "Заправляет из предмета в руке.", en: "Refuels from item in hand." }, returns: "true, newLevel | false, reason", params: [{ name: "count", type: "int", default: "stack", desc: { ru: "Количество предметов", en: "Item count" } }], example: 'local ok, level = android.refuel()\nif ok then\n    print("Fuel: " .. level)\nend' },
    { name: "fuelLevel()", desc: { ru: "Текущий уровень топлива.", en: "Current fuel level." }, returns: "int" },
    { name: "getMaxFuel()", desc: { ru: "Максимальный уровень топлива.", en: "Maximum fuel level." }, returns: "int — 10000" }
  ],
  sensors: [
    { name: "getClosestPlayer()", desc: { ru: "Информация о ближайшем игроке.", en: "Info about closest player." }, returns: "table|nil" },
    { name: "getNearbyMobs([type])", desc: { ru: "Список ближайших мобов.", en: "List of nearby mobs." }, returns: "table[]", params: [{ name: "type", type: "string", default: "all", desc: { ru: "Фильтр по типу", en: "Type filter" } }], example: 'local zombies = android.getNearbyMobs("minecraft:zombie")' },
    { name: "getClosestMob([type])", desc: { ru: "Ближайший моб указанного типа.", en: "Closest mob of specified type." }, returns: "table|nil", params: [{ name: "type", type: "string", default: "any", desc: { ru: "Фильтр по типу", en: "Type filter" } }] },
    { name: "getBlocksOfType(type)", desc: { ru: "Блоки определённого типа в радиусе поиска.", en: "Blocks of specified type in search radius." }, returns: "table[]", params: [{ name: "type", type: "string", desc: { ru: "ID блока", en: "Block ID" } }], example: 'local ores = android.getBlocksOfType("minecraft:diamond_ore")' },
    { name: "scanEntities([radius])", desc: { ru: "Все сущности в радиусе. Макс. 100, сортировка по расстоянию.", en: "All entities in radius. Max 100, sorted by distance." }, returns: "table[]", params: [{ name: "radius", type: "number", default: "search radius", desc: { ru: "Радиус (макс. 64)", en: "Radius (max 64)" } }], example: '-- Returns:\n{\n    uuid = "...",\n    name = "Zombie",\n    type = "minecraft:zombie",\n    x = 10.5, y = 64.0, z = 20.3,\n    distance = 5.2,\n    health = 20.0, maxHealth = 20.0,\n    isPlayer = false, isHostile = true\n}' },
    { name: "scanPlayers([radius])", desc: { ru: "Все игроки в радиусе. Включает поле isOwner.", en: "All players in radius. Includes isOwner field." }, returns: "table[]", params: [{ name: "radius", type: "number", default: "32.0", desc: { ru: "Радиус (макс. 128)", en: "Radius (max 128)" } }] },
    { name: "canSeeEntity(uuid)", desc: { ru: "Проверяет видимость сущности (raycast).", en: "Checks entity visibility (raycast)." }, returns: "boolean | false, reason", params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "canSeeBlock(x, y, z)", desc: { ru: "Проверяет видимость блока (raycast).", en: "Checks block visibility (raycast)." }, returns: "boolean" },
    { name: "getDistanceToEntity(uuid)", desc: { ru: "Расстояние до сущности.", en: "Distance to entity." }, returns: "number|nil", params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "getOwner()", desc: { ru: "Информация о владельце андроида.", en: "Info about android owner." }, returns: "table|nil — {name, uuid}" },
    { name: "getContainerInfo(x, y, z)", desc: { ru: "Содержимое контейнера.", en: "Container contents." }, returns: "table | false, reason" },
    { name: "storeHeldItemInContainer(x, y, z, slot)", desc: { ru: "Кладёт предмет из руки в контейнер. Макс. 5 блоков.", en: "Stores held item in container. Max 5 blocks." }, returns: "true", tags: ["fuel", "range"] },
    { name: "grabItemFromContainer(x, y, z, slot)", desc: { ru: "Берёт предмет из контейнера. Макс. 5 блоков.", en: "Grabs item from container. Max 5 blocks." }, returns: "true", tags: ["fuel", "range"] }
  ],
  events: [
    { name: "setEventsEnabled(enabled)", desc: { ru: "Включает/выключает систему событий.", en: "Enables/disables event system." }, returns: "true", params: [{ name: "enabled", type: "boolean", desc: { ru: "Включить/выключить", en: "Enable/disable" } }] },
    { name: "isEventsEnabled()", desc: { ru: "Проверяет, включены ли события.", en: "Checks if events are enabled." }, returns: "boolean" },
    { name: "setEntityTrackRadius(radius)", desc: { ru: "Устанавливает радиус трекинга сущностей.", en: "Sets entity tracking radius." }, returns: "true", params: [{ name: "radius", type: "number", desc: { ru: "Радиус", en: "Radius" } }] },
    { name: "getEntityTrackRadius()", desc: { ru: "Возвращает текущий радиус трекинга.", en: "Returns current tracking radius." }, returns: "number" },
    { name: "getTrackedEntities()", desc: { ru: "Список UUID отслеживаемых сущностей.", en: "List of tracked entity UUIDs." }, returns: "table" },
    { name: "resetEntityTracking()", desc: { ru: "Сбрасывает трекинг сущностей.", en: "Resets entity tracking." }, returns: "true" }
  ],
  inspection: [
    { name: "inspect(x, y, z)", desc: { ru: "Детальная информация о блоке.", en: "Detailed block info." }, returns: 'true, table|"air" | false, reason', example: '-- Returns:\n{\n    name = "minecraft:oak_door",\n    x = 10, y = 64, z = 20,\n    hardness = 3.0,\n    isSolid = true, isLiquid = false,\n    luminance = 0,\n    hasBlockEntity = false,\n    state = {\n        facing = "north",\n        half = "lower",\n        open = "false"\n    }\n}' },
    { name: "inspectFront()", desc: { ru: "Инспектирует блок спереди.", en: "Inspects block in front." }, returns: 'true, table|"air"' },
    { name: "inspectUp()", desc: { ru: "Инспектирует блок над головой.", en: "Inspects block above." }, returns: 'true, table|"air"' },
    { name: "inspectDown()", desc: { ru: "Инспектирует блок под ногами.", en: "Inspects block below." }, returns: 'true, table|"air"' },
    { name: "getLight()", desc: { ru: "Уровень освещения на позиции.", en: "Light level at position." }, returns: "table — {block, sky, total}" },
    { name: "getBiome()", desc: { ru: "Биом на позиции.", en: "Biome at position." }, returns: 'string — "minecraft:plains"' },
    { name: "getWeather()", desc: { ru: "Текущая погода.", en: "Current weather." }, returns: "table — {isRaining, isThundering}" },
    { name: "getTime()", desc: { ru: "Время в мире.", en: "World time." }, returns: "table — {dayTime, gameTime, day, isDay, isNight}" },
    { name: "canSeeSky()", desc: { ru: "Видит ли андроид небо.", en: "Can android see sky." }, returns: "boolean" },
    { name: "getDimension()", desc: { ru: "Измерение, в котором находится андроид.", en: "Dimension the android is in." }, returns: 'string — "minecraft:overworld"' }
  ],
  position: [
    { name: "getPosition()", desc: { ru: "Позиция андроида.", en: "Android position." }, returns: "table", example: '-- Returns:\n{\n    x = 100.5, y = 64.0, z = 200.3,\n    blockX = 100, blockY = 64, blockZ = 200\n}' },
    { name: "getRotation()", desc: { ru: "Вращение андроида.", en: "Android rotation." }, returns: "table — {yaw, pitch, facing}" },
    { name: "lookAt(x, y, z)", desc: { ru: "Поворачивает голову к точке.", en: "Turns head to point." }, returns: "true" },
    { name: "lookAtEntity(uuid)", desc: { ru: "Поворачивает голову к сущности.", en: "Turns head to entity." }, returns: "true | false, reason", params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "turnLeft()", desc: { ru: "Поворот на 90° влево.", en: "Turn 90° left." }, returns: "true" },
    { name: "turnRight()", desc: { ru: "Поворот на 90° вправо.", en: "Turn 90° right." }, returns: "true" },
    { name: "turnAround()", desc: { ru: "Разворот на 180°.", en: "Turn 180°." }, returns: "true" },
    { name: "getDistanceTo(x, y, z)", desc: { ru: "Расстояние до точки.", en: "Distance to point." }, returns: "number" },
    { name: "isOnGround()", desc: { ru: "На земле ли андроид.", en: "Is android on ground." }, returns: "boolean" },
    { name: "isInWater()", desc: { ru: "В воде ли андроид.", en: "Is android in water." }, returns: "boolean" },
    { name: "isInLava()", desc: { ru: "В лаве ли андроид.", en: "Is android in lava." }, returns: "boolean" }
  ],
  status: [
    { name: "getHealth()", desc: { ru: "Информация о здоровье.", en: "Health info." }, returns: "table — {current, max, armor}", example: 'local h = android.getHealth()\nprint(h.current .. "/" .. h.max)' },
    { name: "isBurning()", desc: { ru: "Горит ли андроид.", en: "Is android burning." }, returns: "boolean" },
    { name: "getVelocity()", desc: { ru: "Скорость андроида.", en: "Android velocity." }, returns: "table — {x, y, z, speed}" }
  ],
  sprint: [
    { name: "setSprinting(sprint)", desc: { ru: "Включает/выключает бег.", en: "Enables/disables sprinting." }, returns: "true", params: [{ name: "sprint", type: "boolean", desc: { ru: "Включить/выключить", en: "Enable/disable" } }] },
    { name: "setSneaking(sneak)", desc: { ru: "Включает/выключает приседание.", en: "Enables/disables sneaking." }, returns: "true", params: [{ name: "sneak", type: "boolean", desc: { ru: "Включить/выключить", en: "Enable/disable" } }] },
    { name: "isSprinting()", desc: { ru: "Бежит ли андроид.", en: "Is android sprinting." }, returns: "boolean" },
    { name: "isSneaking()", desc: { ru: "Приседает ли андроид.", en: "Is android sneaking." }, returns: "boolean" }
  ],
  chat: [
    { name: "sendChatMessage(message)", desc: { ru: "Отправляет сообщение в чат (макс. 256 символов).", en: "Sends chat message (max 256 chars)." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст сообщения", en: "Message text" } }] },
    { name: "emote(action)", desc: { ru: "Выполняет эмоцию (* Name action).", en: "Performs emote (* Name action)." }, returns: "true", params: [{ name: "action", type: "string", desc: { ru: "Действие (макс. 128 символов)", en: "Action (max 128 chars)" } }], example: 'android.emote("dances")\n-- In chat: "* Wall-E dances"' },
    { name: "changeFace(faceName)", desc: { ru: "Меняет выражение лица.", en: "Changes face expression." }, returns: "true", params: [{ name: "faceName", type: "string", desc: { ru: "Название выражения", en: "Expression name" } }] },
    { name: "playSound(soundName)", desc: { ru: "Проигрывает звук.", en: "Plays sound." }, returns: "true | false, reason", params: [{ name: "soundName", type: "string", desc: { ru: "ID звука", en: "Sound ID" } }], example: 'android.playSound("minecraft:entity.experience_orb.pickup")' }
  ],
  skins: [
    { name: "setSkinByPlayer(playerName)", desc: { ru: "Загружает скин по имени игрока (асинхронно).", en: "Loads skin by player name (async)." }, returns: "true, message", tags: ["async"], params: [{ name: "playerName", type: "string", desc: { ru: "Имя игрока (макс. 16)", en: "Player name (max 16)" } }], events: { ru: '"skin_loaded" — source, success, [error]', en: '"skin_loaded" — source, success, [error]' }, example: 'android.setSkinByPlayer("Notch")\n\nlocal event, source, success, err = os.pullEvent("skin_loaded")\nif success then\n    print("Skin loaded!")\nend' },
    { name: "setSkinByUUID(uuid)", desc: { ru: "Загружает скин по UUID игрока (асинхронно).", en: "Loads skin by player UUID (async)." }, returns: "true, message", tags: ["async"], params: [{ name: "uuid", type: "string", desc: { ru: "UUID игрока", en: "Player UUID" } }] },
    { name: "setSkinByUrl(url)", desc: { ru: "Загружает скин по URL (асинхронно). Должен заканчиваться на .png.", en: "Loads skin by URL (async). Must end with .png." }, returns: "true, message", tags: ["async"], params: [{ name: "url", type: "string", desc: { ru: "URL на PNG (макс. 512)", en: "PNG URL (max 512)" } }] },
    { name: "clearSkin()", desc: { ru: "Сбрасывает скин на стандартный.", en: "Resets skin to default." }, returns: "true" },
    { name: "getSkinInfo()", desc: { ru: "Информация о текущем скине.", en: "Current skin info." }, returns: "table|nil — {url, slim}" },
    { name: "setSlimModel(slim)", desc: { ru: "Устанавливает тип модели (Alex/Steve).", en: "Sets model type (Alex/Steve)." }, returns: "true", params: [{ name: "slim", type: "boolean", desc: { ru: "true = Alex, false = Steve", en: "true = Alex, false = Steve" } }] }
  ],
  fishing: [
    { name: "startFishing([maxCatch], [autoRecast])", desc: { ru: "Начинает рыбалку. Требует удочку и воду рядом.", en: "Starts fishing. Requires rod and water nearby." }, returns: "true | false, reason", tags: ["fuel"], params: [{ name: "maxCatch", type: "int", default: "0 (∞)", desc: { ru: "Макс. количество", en: "Max catch count" } }, { name: "autoRecast", type: "boolean", default: "true", desc: { ru: "Автоперезаброс", en: "Auto recast" } }], events: { ru: '"fish_caught" — catchCount; "fish_missed"', en: '"fish_caught" — catchCount; "fish_missed"' }, example: 'android.startFishing(10, true)\n\nwhile true do\n    local event, data = os.pullEvent()\n    if event == "fish_caught" then\n        print("Caught: " .. data)\n    end\n    local info = android.getFishingInfo()\n    if not info or info.catchCount >= 10 then break end\nend' },
    { name: "stopFishing()", desc: { ru: "Останавливает рыбалку.", en: "Stops fishing." }, returns: "true | false, reason" },
    { name: "getFishingInfo()", desc: { ru: "Информация о текущей сессии рыбалки.", en: "Current fishing session info." }, returns: "table|nil", example: '-- Returns:\n{\n    phase = "waiting",\n    catchCount = 3,\n    hasBobber = true\n}' },
    { name: "isNearWater()", desc: { ru: "Есть ли вода рядом (8 блоков).", en: "Is water nearby (8 blocks)." }, returns: "boolean" }
  ],
  data: [
    { name: "dataSave(key, value)", desc: { ru: "Сохраняет значение в постоянное хранилище.", en: "Saves value to persistent storage." }, returns: "true", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }, { name: "value", type: "any", desc: { ru: "Значение", en: "Value" } }] },
    { name: "dataLoad(key, [default])", desc: { ru: "Загружает значение из хранилища.", en: "Loads value from storage." }, returns: "any", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }, { name: "default", type: "any", default: "nil", desc: { ru: "Значение по умолчанию", en: "Default value" } }] },
    { name: "dataExists(key)", desc: { ru: "Проверяет существование ключа.", en: "Checks if key exists." }, returns: "boolean", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }] },
    { name: "dataDelete(key)", desc: { ru: "Удаляет ключ из хранилища.", en: "Deletes key from storage." }, returns: "true", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }] },
    { name: "dataClear()", desc: { ru: "Очищает всё хранилище.", en: "Clears all storage." }, returns: "true" },
    { name: "dataList()", desc: { ru: "Список всех ключей.", en: "List of all keys." }, returns: "table" },
    { name: "dataGetAll()", desc: { ru: "Все данные из хранилища.", en: "All data from storage." }, returns: "table" }
  ],
  debug: [
    { name: "log(message)", desc: { ru: "Пишет информационное сообщение в серверный лог.", en: "Writes info message to server log." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст (макс. 512)", en: "Text (max 512)" } }], example: 'android.log("Starting work")\n-- [Android Wall-E] Starting work' },
    { name: "logWarning(message)", desc: { ru: "Пишет предупреждение в серверный лог.", en: "Writes warning to server log." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст (макс. 512)", en: "Text (max 512)" } }] },
    { name: "logError(message)", desc: { ru: "Пишет ошибку в серверный лог.", en: "Writes error to server log." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст (макс. 512)", en: "Text (max 512)" } }] }
  ]
};
// ===== STATE =====
let currentLang = localStorage.getItem('wiki-lang') || 'ru';
let searchQuery = '';
let openMethods = new Set();
// ===== HELPERS =====
function t(key) {
  const keys = key.split('.');
  let val = T[currentLang];
  for (const k of keys) {
    if (val && val[k] !== undefined) val = val[k];
    else return key;
  }
  return val;
}
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function highlightLua(code) {
  let html = escapeHtml(code);
  // Comments
  html = html.replace(/(--[^\n]*)/g, '<span class="cmt">$1</span>');
  // Strings
  html = html.replace(/(&quot;[^&]*?&quot;|"[^"]*?")/g, '<span class="str">$1</span>');
  // Keywords
  const kws = ['local', 'if', 'then', 'else', 'elseif', 'end', 'for', 'do', 'while', 'repeat', 'until', 'function', 'return', 'and', 'or', 'not', 'in', 'true', 'false', 'nil', 'break'];
  kws.forEach(kw => {
    html = html.replace(new RegExp('\\b(' + kw + ')\\b', 'g'), '<span class="kw">$1</span>');
  });
  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');
  // Function calls
  html = html.replace(/(\w+)(\()/g, '<span class="fn">$1</span>$2');
  return html;
}
function getTotalMethods() {
  let total = 0;
  for (const key in apiData) {
    total += apiData[key].length;
  }
  return total;
}
// ===== RENDER =====
function render() {
  const app = document.getElementById('app');
  const categoryKeys = Object.keys(apiData);
  let filteredData = {};
  let totalFiltered = 0;
  for (const key of categoryKeys) {
    const methods = apiData[key].filter(m => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const nameMatch = m.name.toLowerCase().includes(q);
      const descMatch = (m.desc[currentLang] || m.desc.ru || '').toLowerCase().includes(q);
      return nameMatch || descMatch;
    });
    if (methods.length > 0) {
      filteredData[key] = methods;
      totalFiltered += methods.length;
    }
  }
  // Sidebar
  let sidebarNav = '';
  for (const key of categoryKeys) {
    const count = apiData[key].length;
    const isActive = filteredData[key] ? '' : 'style="opacity:0.3"';
    sidebarNav += `
      <a class="nav-item" href="#cat-${key}" ${isActive} onclick="closeSidebar()">
        <span class="nav-item-left">${t('categories.' + key)}</span>
        <span class="nav-count">${count}</span>
      </a>`;
  }
  // Methods
  let contentHtml = '';
  if (totalFiltered === 0 && searchQuery) {
    contentHtml = `
      <div class="no-results">
        <div class="emoji">🔍</div>
        <p>${t('noResults')}</p>
        <p style="font-size:13px;margin-top:8px">${t('noResultsDesc')}</p>
      </div>`;
  } else {
    for (const key in filteredData) {
      const methods = filteredData[key];
      let methodsHtml = '';
      for (const m of methods) {
        const isOpen = openMethods.has(m.name);
        const openClass = isOpen ? 'open' : '';
        // Tags
        let tagsHtml = '';
        if (m.tags) {
          m.tags.forEach(tag => {
            const labels = { fuel: '⛽', async: '⚡', range: '📏' };
            tagsHtml += `<span class="tag tag-${tag}">${labels[tag] || tag}</span>`;
          });
        }
        // Brief
        const brief = m.desc[currentLang] || m.desc.ru || '';
        const shortBrief = brief.length > 50 ? brief.substring(0, 50) + '...' : brief;
        // Body content
        let bodyHtml = '';
        bodyHtml += `<div class="method-desc">${brief}</div>`;
        // Params
        if (m.params && m.params.length > 0) {
          bodyHtml += `<div class="params-section">
            <div class="params-label">${t('params')}</div>
            <table class="params-table">
              <tr><th>${t('param')}</th><th>${t('type')}</th>${m.params.some(p => p.default) ? `<th>${t('default')}</th>` : ''}<th>${t('description')}</th></tr>`;
          for (const p of m.params) {
            const desc = p.desc[currentLang] || p.desc.ru || '';
            bodyHtml += `<tr><td>${p.name}</td><td>${p.type}</td>${m.params.some(pp => pp.default) ? `<td>${p.default || '—'}</td>` : ''}<td>${desc}</td></tr>`;
          }
          bodyHtml += `</table></div>`;
        }
        // Returns
        if (m.returns) {
          bodyHtml += `<div class="returns-line">
            <span class="returns-label">${t('returns')}:</span>
            <span class="returns-value">${escapeHtml(m.returns)}</span>
          </div>`;
        }
        // Requires
        if (m.tags && m.tags.includes('fuel')) {
          bodyHtml += `<div class="requires-line">⛽ ${t('requires')}: fuel</div>`;
        }
        // Exceptions
        if (m.exceptions) {
          const exc = m.exceptions[currentLang] || m.exceptions.ru || '';
          bodyHtml += `<div class="requires-line" style="color:var(--red)">⚠️ ${t('exceptions')}: ${exc}</div>`;
        }
        // Events
        if (m.events) {
          const ev = m.events[currentLang] || m.events.ru || '';
          bodyHtml += `<div class="requires-line" style="color:var(--purple)">📢 ${t('events')}: ${ev}</div>`;
        }
        // Example
        if (m.example) {
          bodyHtml += `
            <div class="code-block">
              <div class="code-header">
                <span>Lua — ${t('example')}</span>
                <button class="copy-btn" onclick="copyCode(this, event)">${t('copy')}</button>
              </div>
              <div class="code-content"><pre>${highlightLua(m.example)}</pre></div>
            </div>`;
        }
        methodsHtml += `
          <div class="method-card ${openClass}" id="method-${m.name.replace(/[^a-zA-Z0-9]/g, '_')}">
            <div class="method-header" onclick="toggleMethod('${m.name}')">
              <span class="method-name">${m.name}</span>
              <div class="method-header-right">
                <span class="method-brief">${shortBrief}</span>
                <div class="method-tags">${tagsHtml}</div>
                <span class="chevron">▼</span>
              </div>
            </div>
            <div class="method-body">${bodyHtml}</div>
          </div>`;
      }
      contentHtml += `
        <div class="category-section" id="cat-${key}">
          <div class="category-header">
            <h2>${t('categories.' + key)}</h2>
            <span class="category-badge">${methods.length} ${t('methods')}</span>
          </div>
          ${methodsHtml}
        </div>`;
    }
    // Limits table
    const limitsData = [
      { ru: 'Дальность ближнего боя', en: 'Melee range', val: '4' },
      { ru: 'Дальность стрельбы', en: 'Bow range', val: '32' },
      { ru: 'Дальность копания', en: 'Mining range', val: '6' },
      { ru: 'Дальность размещения', en: 'Placement range', val: '5' },
      { ru: 'Дальность взаимодействия', en: 'Interaction range', val: '5' },
      { ru: 'Дальность навигации', en: 'Navigation range', val: '64' },
      { ru: 'Дальность сканирования', en: 'Scan range', val: '64' },
      { ru: 'Макс. сущностей в скане', en: 'Max scan entities', val: '100' },
      { ru: 'Макс. длина имени', en: 'Max name length', val: '32' },
      { ru: 'Макс. длина сообщения', en: 'Max message length', val: '256' },
      { ru: 'Макс. длина лог-сообщения', en: 'Max log message length', val: '512' },
      { ru: 'Макс. топливо', en: 'Max fuel', val: '10000' }
    ];
    let limitsRows = '';
    limitsData.forEach(l => {
      limitsRows += `<tr><td>${l[currentLang]}</td><td>${l.val}</td></tr>`;
    });
    contentHtml += `
      <div class="limits-section" id="cat-limits">
        <div class="category-header">
          <h2>⚠️ ${t('limits')}</h2>
        </div>
        <table class="limits-table">
          <tr><th>${t('parameter')}</th><th>${t('value')}</th></tr>
          ${limitsRows}
        </table>
      </div>`;
    // Summary table
    let summaryRows = '';
    let totalAll = 0;
    for (const key of categoryKeys) {
      const count = apiData[key].length;
      totalAll += count;
      summaryRows += `<tr><td>${t('categories.' + key)}</td><td>${count}</td></tr>`;
    }
    summaryRows += `<tr><td><strong>${t('total')}</strong></td><td><strong>${totalAll}</strong></td></tr>`;
    contentHtml += `
      <div class="limits-section" id="cat-summary" style="margin-top:32px">
        <div class="category-header">
          <h2>📊 ${t('summary')}</h2>
        </div>
        <table class="summary-table">
          <tr><th>${t('category')}</th><th>${t('count')}</th></tr>
          ${summaryRows}
        </table>
      </div>`;
  }
  app.innerHTML = `
    <div class="overlay" id="overlay" onclick="closeSidebar()"></div>
    <div class="layout">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <span class="emoji">🤖</span>
            <span>CC: Android Rework</span>
          </div>
          <div class="sidebar-subtitle">API Reference v1.0</div>
        </div>
        <nav class="sidebar-nav">${sidebarNav}</nav>
      </aside>
      <main class="main-content">
        <div class="topbar">
          <button class="menu-btn" onclick="toggleSidebar()">☰</button>
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="searchInput" placeholder="${t('search')}" value="${searchQuery}" oninput="onSearch(this.value)">
          </div>
          <div class="lang-switcher">
            <button class="lang-btn ${currentLang === 'ru' ? 'active' : ''}" onclick="setLang('ru')">RU</button>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
          </div>
          <span class="method-count-badge">${getTotalMethods()} ${t('methods')}</span>
        </div>
        <div class="content-area">
          <div class="hero">
            <h1>🤖 <span>${t('heroTitle')}</span></h1>
            <p class="hero-desc">${t('heroDesc')}</p>
          </div>
          ${contentHtml}
        </div>
      </main>
    </div>
    <button class="back-to-top" id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>`;
  // Restore focus on search
  const si = document.getElementById('searchInput');
  if (si && document.activeElement && document.activeElement.tagName === 'INPUT') {
    si.focus();
    si.setSelectionRange(si.value.length, si.value.length);
  }
}
// ===== ACTIONS =====
function toggleMethod(name) {
  if (openMethods.has(name)) {
    openMethods.delete(name);
  } else {
    openMethods.add(name);
  }
  render();
}
let searchTimeout;
function onSearch(val) {
  searchQuery = val;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => render(), 150);
}
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('wiki-lang', lang);
  render();
}
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
function copyCode(btn, event) {
  event.stopPropagation();
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = t('copied');
    setTimeout(() => { btn.textContent = t('copy'); }, 1500);
  }).catch(() => {});
}
// Back to top
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.classList.toggle('show', window.scrollY > 400);
  }
});
// Init
render();