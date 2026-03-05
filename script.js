// ===== PARTICLES SYSTEM =====
let particlesEnabled = localStorage.getItem('particles') !== 'false';
let particlesArr = [];
let animFrame;

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  particlesArr = [];
  for (let i = 0; i < 80; i++) {
    particlesArr.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.3 + 0.05
    });
  }

  function draw() {
    if (!particlesEnabled) { ctx.clearRect(0, 0, canvas.width, canvas.height); animFrame = requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArr.length; i++) {
      const p = particlesArr[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + p.o + ')';
      ctx.fill();
    }
    // lines
    for (let i = 0; i < particlesArr.length; i++) {
      for (let j = i + 1; j < particlesArr.length; j++) {
        const dx = particlesArr[i].x - particlesArr[j].x;
        const dy = particlesArr[i].y - particlesArr[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
          ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.04 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animFrame = requestAnimationFrame(draw);
  }
  draw();
}

function toggleParticles() {
  particlesEnabled = !particlesEnabled;
  localStorage.setItem('particles', particlesEnabled);
  render();
}

// ===== TRANSLATIONS =====
const T = {
  ru: {
    title: "CC: Android Rework API", subtitle: "API Reference",
    heroTitle: "Android API Reference",
    heroDesc: "Полный справочник всех методов CcAndroidAPI для управления андроидами в CC: Android Rework. Нажмите на метод для просмотра подробностей и примеров кода.",
    search: "Поиск методов...", methods: "методов",
    noResults: "Ничего не найдено", noResultsDesc: "Попробуйте другой поисковый запрос",
    params: "Параметры", returns: "Возвращает", requires: "Требует",
    exceptions: "Исключения", events: "События", example: "Пример",
    copy: "Копировать", copied: "Скопировано!", limits: "Ограничения",
    summary: "Сводка методов", category: "Категория", count: "Количество",
    total: "Итого", value: "Значение", parameter: "Параметр",
    param: "Параметр", type: "Тип", default: "По умолчанию",
    description: "Описание", particles: "Частицы",
    categories: {
      tasks: "📋 Управление задачами", self: "🤖 Информация о себе",
      combat: "⚔️ Боевая система", navigation: "🧭 Навигация",
      movement: "🚶 Простое движение", digging_move: "⛏️ Движение с автокопанием",
      water: "🌊 Вода, лестницы, ползание", detection: "🔍 Детекция блоков",
      mining: "🔨 Копание и строительство", interaction: "🤝 Взаимодействие",
      inventory: "🎒 Инвентарь", carrying: "🏋️ Переноска сущностей",
      armor: "🛡️ Броня", fuel: "⛽ Топливо",
      sensors: "📡 Сенсоры и сканирование", events: "📢 События",
      inspection: "🌍 Инспекция мира", position: "📍 Позиция и вращение",
      status: "💚 Статус и здоровье", sprint: "🏃 Бег и приседание",
      chat: "💬 Общение", skins: "🎨 Система скинов",
      fishing: "🎣 Рыбалка", data: "💾 Постоянные данные",
      debug: "🐛 Отладка"
    }
  },
  en: {
    title: "CC: Android Rework API", subtitle: "API Reference",
    heroTitle: "Android API Reference",
    heroDesc: "Complete reference of all CcAndroidAPI methods for controlling androids in CC: Android Rework. Click on a method to view details and code examples.",
    search: "Search methods...", methods: "methods",
    noResults: "Nothing found", noResultsDesc: "Try a different search query",
    params: "Parameters", returns: "Returns", requires: "Requires",
    exceptions: "Exceptions", events: "Events", example: "Example",
    copy: "Copy", copied: "Copied!", limits: "Limitations",
    summary: "Methods Summary", category: "Category", count: "Count",
    total: "Total", value: "Value", parameter: "Parameter",
    param: "Parameter", type: "Type", default: "Default",
    description: "Description", particles: "Particles",
    categories: {
      tasks: "📋 Task Management", self: "🤖 Self Info",
      combat: "⚔️ Combat System", navigation: "🧭 Navigation",
      movement: "🚶 Simple Movement", digging_move: "⛏️ Movement with Auto-Mining",
      water: "🌊 Water, Ladders, Crawling", detection: "🔍 Block Detection",
      mining: "🔨 Mining & Building", interaction: "🤝 Interaction",
      inventory: "🎒 Inventory", carrying: "🏋️ Carrying Entities",
      armor: "🛡️ Armor", fuel: "⛽ Fuel",
      sensors: "📡 Sensors & Scanning", events: "📢 Events",
      inspection: "🌍 World Inspection", position: "📍 Position & Rotation",
      status: "💚 Status & Health", sprint: "🏃 Sprinting & Sneaking",
      chat: "💬 Communication", skins: "🎨 Skin System",
      fishing: "🎣 Fishing", data: "💾 Persistent Data",
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
    { name: "shootBow([power])", desc: { ru: "Стреляет из лука по ближайшей видимой цели впереди.", en: "Shoots bow at nearest visible target ahead." }, returns: "true, name | false, reason", tags: ["fuel", "range"], params: [{ name: "power", type: "number", default: "1.0", desc: { ru: "Сила выстрела (0.1—1.0)", en: "Shot power (0.1—1.0)" } }], example: 'android.shootBow(0.8)' },
    { name: "getAttackDamage()", desc: { ru: "Возвращает базовый урон атаки.", en: "Returns base attack damage." }, returns: "number" },
    { name: "getReach()", desc: { ru: "Возвращает максимальную дальность ближнего боя.", en: "Returns max melee reach." }, returns: "number — 4.0" }
  ],
  navigation: [
    { name: "moveTo(x, y, z)", desc: { ru: "Идёт к блоку через pathfinding. Макс. 64 блока.", en: "Moves to block via pathfinding. Max 64 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "x, y, z", type: "int", desc: { ru: "Координаты", en: "Coordinates" } }], example: 'android.moveTo(100, 64, 200)' },
    { name: "goTo(entityUUID)", desc: { ru: "Идёт к сущности через pathfinding. Макс. 64 блока.", en: "Moves to entity via pathfinding. Max 64 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "entityUUID", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "canReach(x, y, z)", desc: { ru: "Проверяет, существует ли путь до позиции.", en: "Checks if path to position exists." }, returns: "boolean" },
    { name: "getPathLength(x, y, z)", desc: { ru: "Возвращает длину пути до позиции.", en: "Returns path length to position." }, returns: "number|nil" }
  ],
  movement: [
    { name: "forward()", desc: { ru: "Шаг вперёд на 1 блок.", en: "Step forward 1 block." }, returns: "true | false, reason", tags: ["fuel"], example: 'for i = 1, 10 do\n    local ok, err = android.forward()\n    if not ok then\n        print("Blocked: " .. err)\n        break\n    end\nend' },
    { name: "back()", desc: { ru: "Шаг назад на 1 блок.", en: "Step back 1 block." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "up()", desc: { ru: "Движение вверх (прыжок).", en: "Move up (jump)." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "down()", desc: { ru: "Движение вниз на 1 блок.", en: "Move down 1 block." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "jump()", desc: { ru: "Прыжок на месте.", en: "Jump in place." }, returns: "true | false, reason", tags: ["fuel"] }
  ],
  digging_move: [
    { name: "stepForward()", desc: { ru: "Шаг вперёд с автоматическим копанием блоков на пути.", en: "Step forward with auto-mining blocks in path." }, returns: 'true | true, "digging" | false, reason', tags: ["fuel"] },
    { name: "stepUp()", desc: { ru: "Шаг вверх с автокопанием.", en: "Step up with auto-mining." }, returns: 'true | true, "digging" | true, "jumping" | false, reason', tags: ["fuel"] },
    { name: "stepDown()", desc: { ru: "Шаг вниз с автокопанием.", en: "Step down with auto-mining." }, returns: 'true | true, "digging" | false, reason', tags: ["fuel"] },
    { name: "climbUp()", desc: { ru: "Подъём с автокопанием 3 блоков.", en: "Climb up with auto-mining 3 blocks." }, returns: 'true | true, "digging" | true, "climbing" | false, reason', tags: ["fuel"] },
    { name: "tunnelForward()", desc: { ru: "Прокапывает туннель 1×2 и движется вперёд.", en: "Digs 1x2 tunnel and moves forward." }, returns: 'true | true, "digging_low" | true, "digging_high" | false, reason', tags: ["fuel"] }
  ],
  water: [
    { name: "swim()", desc: { ru: "Плывёт в направлении взгляда.", en: "Swims in look direction." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "dive()", desc: { ru: "Погружается вниз в воде.", en: "Dives down in water." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "surfaceFromWater()", desc: { ru: "Всплывает на поверхность.", en: "Surfaces from water." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "climbLadder()", desc: { ru: "Карабкается вверх по лестнице.", en: "Climbs up ladder." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "crawl()", desc: { ru: "Ползёт вперёд.", en: "Crawls forward." }, returns: "true", tags: ["fuel"] },
    { name: "isSwimming()", desc: { ru: "Проверяет, плывёт ли андроид.", en: "Checks if android is swimming." }, returns: "boolean" },
    { name: "isClimbing()", desc: { ru: "Проверяет, карабкается ли.", en: "Checks if climbing." }, returns: "boolean" },
    { name: "getSwimDirection()", desc: { ru: "Возвращает направление плавания.", en: "Returns swim direction." }, returns: "table|nil — {x, y, z}" }
  ],
  detection: [
    { name: "detectFront()", desc: { ru: "Есть ли блок спереди.", en: "Is there a block in front." }, returns: "boolean", example: 'if android.detectFront() then\n    android.digFront()\nend' },
    { name: "detectUp()", desc: { ru: "Есть ли блок сверху.", en: "Is there a block above." }, returns: "boolean" },
    { name: "detectDown()", desc: { ru: "Есть ли блок снизу.", en: "Is there a block below." }, returns: "boolean" },
    { name: "getBlockInFront()", desc: { ru: "Информация о блоке спереди.", en: "Info about block in front." }, returns: 'table|"air"' },
    { name: "getBlockAbove()", desc: { ru: "Информация о блоке сверху.", en: "Info about block above." }, returns: 'table|"air"' },
    { name: "getBlockBelow()", desc: { ru: "Информация о блоке снизу.", en: "Info about block below." }, returns: 'table|"air"' }
  ],
  mining: [
    { name: "digFront()", desc: { ru: "Копает блок спереди.", en: "Digs block in front." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "digUp()", desc: { ru: "Копает блок сверху.", en: "Digs block above." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "digDown()", desc: { ru: "Копает блок снизу.", en: "Digs block below." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "breakBlock(x, y, z)", desc: { ru: "Ломает блок по координатам. Макс. 6 блоков.", en: "Breaks block at coordinates. Max 6 blocks." }, returns: "true | false, reason", tags: ["fuel", "range"], params: [{ name: "x, y, z", type: "int", desc: { ru: "Координаты", en: "Coordinates" } }] },
    { name: "placeFront()", desc: { ru: "Ставит блок спереди.", en: "Places block in front." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "placeUp()", desc: { ru: "Ставит блок сверху.", en: "Places block above." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "placeDown()", desc: { ru: "Ставит блок снизу.", en: "Places block below." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "placeBlock(x, y, z)", desc: { ru: "Ставит блок по координатам.", en: "Places block at coordinates." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "compareBlock(x, y, z)", desc: { ru: "Сравнивает блок в мире с блоком в руке.", en: "Compares world block with block in hand." }, returns: "boolean" }
  ],
  interaction: [
    { name: "useBlock(x, y, z)", desc: { ru: "Правый клик по блоку.", en: "Right click on block." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "useEntity(uuid)", desc: { ru: "Правый клик по сущности.", en: "Right click on entity." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "useItem()", desc: { ru: "Использует предмет в руке.", en: "Uses item in hand." }, returns: "true, healing | false, reason", tags: ["fuel"] },
    { name: "useItemOnBlock(x, y, z)", desc: { ru: "Использует предмет на блоке.", en: "Uses item on block." }, returns: "true | false, reason", tags: ["fuel", "range"] },
    { name: "useItemOnEntity(uuid)", desc: { ru: "Использует предмет на сущности.", en: "Uses item on entity." }, returns: "true | false, reason", tags: ["fuel", "range"] }
  ],
  inventory: [
    { name: "getHandInfo(hand)", desc: { ru: "Информация о предмете в руке.", en: "Info about item in hand." }, returns: "table|nil", params: [{ name: "hand", type: "string", desc: { ru: '"right"/"main" или "left"/"off"', en: '"right"/"main" or "left"/"off"' } }] },
    { name: "swapHands()", desc: { ru: "Меняет предметы между руками.", en: "Swaps items between hands." }, returns: "true" },
    { name: "storeItem(index)", desc: { ru: "Кладёт предмет из руки в слот.", en: "Stores item from hand to slot." }, returns: "true | false, reason", params: [{ name: "index", type: "int", desc: { ru: "Индекс слота (0-based)", en: "Slot index (0-based)" } }] },
    { name: "equipSlot(index)", desc: { ru: "Берёт предмет из слота в руку.", en: "Takes item from slot to hand." }, returns: "true | false, reason", params: [{ name: "index", type: "int", desc: { ru: "Индекс слота (0-based)", en: "Slot index (0-based)" } }] },
    { name: "getSlotInfo(index)", desc: { ru: "Информация о предмете в слоте.", en: "Info about item in slot." }, returns: "table|nil", params: [{ name: "index", type: "int", desc: { ru: "Индекс слота (0-based)", en: "Slot index (0-based)" } }] },
    { name: "select(slot)", desc: { ru: "Выбирает слот (1-based).", en: "Selects slot (1-based)." }, returns: "true", params: [{ name: "slot", type: "int", desc: { ru: "Номер слота (1-based)", en: "Slot number (1-based)" } }] },
    { name: "getSelectedSlot()", desc: { ru: "Текущий выбранный слот.", en: "Current selected slot." }, returns: "int (1-based)" },
    { name: "getItemDetail([slot])", desc: { ru: "Детальная информация о предмете.", en: "Detailed item info." }, returns: "table|nil" },
    { name: "getItemCount([slot])", desc: { ru: "Количество предметов в слоте.", en: "Item count in slot." }, returns: "int" },
    { name: "getItemSpace([slot])", desc: { ru: "Свободное место в слоте.", en: "Free space in slot." }, returns: "int" },
    { name: "transferTo(toSlot, [count])", desc: { ru: "Перемещает предметы.", en: "Transfers items." }, returns: "boolean", params: [{ name: "toSlot", type: "int", desc: { ru: "Целевой слот (1-based)", en: "Target slot (1-based)" } }] },
    { name: "list()", desc: { ru: "Список всех непустых слотов.", en: "List of all non-empty slots." }, returns: "table", example: 'local items = android.list()\nfor slot, item in pairs(items) do\n    print("Slot " .. slot .. ": " .. item.name)\nend' },
    { name: "findItem(itemName)", desc: { ru: "Ищет предмет в инвентаре.", en: "Finds item in inventory." }, returns: '"main"|"off"|int|nil', params: [{ name: "itemName", type: "string", desc: { ru: "ID предмета", en: "Item ID" } }] },
    { name: "hasItem(itemName)", desc: { ru: "Проверяет наличие предмета.", en: "Checks if item exists." }, returns: "boolean", params: [{ name: "itemName", type: "string", desc: { ru: "ID предмета", en: "Item ID" } }] },
    { name: "countItem(itemName)", desc: { ru: "Считает количество предмета.", en: "Counts item amount." }, returns: "int", params: [{ name: "itemName", type: "string", desc: { ru: "ID предмета", en: "Item ID" } }] },
    { name: "getInventorySize()", desc: { ru: "Количество слотов.", en: "Slot count." }, returns: "int" },
    { name: "isInventoryFull()", desc: { ru: "Полон ли инвентарь.", en: "Is inventory full." }, returns: "boolean" },
    { name: "pickup([itemType])", desc: { ru: "Подбирает предмет с земли.", en: "Picks up item from ground." }, returns: "true | false, reason" },
    { name: "dropItem()", desc: { ru: "Выбрасывает предмет из руки.", en: "Drops item from hand." }, returns: "result" }
  ],
  carrying: [
    { name: "pickupEntity(uuid)", desc: { ru: "Поднимает сущность.", en: "Picks up entity." }, returns: "true, name | false, reason", tags: ["fuel"], params: [{ name: "uuid", type: "string", desc: { ru: "UUID сущности", en: "Entity UUID" } }] },
    { name: "pickupNearestPlayer()", desc: { ru: "Поднимает ближайшего игрока.", en: "Picks up nearest player." }, returns: "true, name | false, reason", tags: ["fuel"] },
    { name: "dropEntity()", desc: { ru: "Опускает несомую сущность.", en: "Drops carried entity." }, returns: "true, name | false, reason" },
    { name: "throwEntity([power])", desc: { ru: "Бросает несомую сущность.", en: "Throws carried entity." }, returns: "true, name | false, reason", tags: ["fuel"] },
    { name: "handOverTo(androidUuid)", desc: { ru: "Передаёт сущность другому андроиду.", en: "Hands over entity to another android." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "isCarrying()", desc: { ru: "Несёт ли андроид кого-то.", en: "Is carrying someone." }, returns: "boolean" },
    { name: "isCarryingPlayer()", desc: { ru: "Несёт ли игрока.", en: "Is carrying a player." }, returns: "boolean" },
    { name: "getCarriedEntity()", desc: { ru: "Информация о несомой сущности.", en: "Carried entity info." }, returns: "table|nil" },
    { name: "setCarryPermission(playerUuid, allowed)", desc: { ru: "Устанавливает разрешение.", en: "Sets carry permission." }, returns: "true | false, reason", params: [{ name: "playerUuid", type: "string", desc: { ru: "UUID игрока", en: "Player UUID" } }, { name: "allowed", type: "boolean", desc: { ru: "Разрешить/запретить", en: "Allow/deny" } }] },
    { name: "hasCarryPermission(playerUuid)", desc: { ru: "Проверяет разрешение.", en: "Checks permission." }, returns: "boolean", params: [{ name: "playerUuid", type: "string", desc: { ru: "UUID игрока", en: "Player UUID" } }] }
  ],
  armor: [
    { name: "equipArmor(slotName)", desc: { ru: "Надевает броню.", en: "Equips armor." }, returns: "true | false, reason", tags: ["fuel"], params: [{ name: "slotName", type: "string", desc: { ru: '"head", "chest", "legs", "feet"', en: '"head", "chest", "legs", "feet"' } }] },
    { name: "removeArmor(slotName)", desc: { ru: "Снимает броню.", en: "Removes armor." }, returns: "true | false, reason", tags: ["fuel"], params: [{ name: "slotName", type: "string", desc: { ru: "Слот брони", en: "Armor slot" } }] },
    { name: "getArmor(slotName)", desc: { ru: "Информация о броне.", en: "Armor info." }, returns: "table|nil", params: [{ name: "slotName", type: "string", desc: { ru: "Слот брони", en: "Armor slot" } }] },
    { name: "getArmorPoints()", desc: { ru: "Очки брони.", en: "Armor points." }, returns: "int" }
  ],
  fuel: [
    { name: "refuel([count])", desc: { ru: "Заправляет из предмета в руке.", en: "Refuels from item in hand." }, returns: "true, newLevel | false, reason", example: 'local ok, level = android.refuel()\nif ok then\n    print("Fuel: " .. level)\nend' },
    { name: "fuelLevel()", desc: { ru: "Текущий уровень топлива.", en: "Current fuel level." }, returns: "int" },
    { name: "getMaxFuel()", desc: { ru: "Максимальный уровень топлива.", en: "Maximum fuel level." }, returns: "int — 10000" }
  ],
  sensors: [
    { name: "getClosestPlayer()", desc: { ru: "Ближайший игрок.", en: "Closest player." }, returns: "table|nil" },
    { name: "getNearbyMobs([type])", desc: { ru: "Список ближайших мобов.", en: "List of nearby mobs." }, returns: "table[]", params: [{ name: "type", type: "string", default: "all", desc: { ru: "Фильтр по типу", en: "Type filter" } }] },
    { name: "getClosestMob([type])", desc: { ru: "Ближайший моб.", en: "Closest mob." }, returns: "table|nil" },
    { name: "getBlocksOfType(type)", desc: { ru: "Блоки определённого типа.", en: "Blocks of specified type." }, returns: "table[]", params: [{ name: "type", type: "string", desc: { ru: "ID блока", en: "Block ID" } }] },
    { name: "scanEntities([radius])", desc: { ru: "Все сущности в радиусе.", en: "All entities in radius." }, returns: "table[]" },
    { name: "scanPlayers([radius])", desc: { ru: "Все игроки в радиусе.", en: "All players in radius." }, returns: "table[]" },
    { name: "canSeeEntity(uuid)", desc: { ru: "Видимость сущности.", en: "Entity visibility." }, returns: "boolean | false, reason" },
    { name: "canSeeBlock(x, y, z)", desc: { ru: "Видимость блока.", en: "Block visibility." }, returns: "boolean" },
    { name: "getDistanceToEntity(uuid)", desc: { ru: "Расстояние до сущности.", en: "Distance to entity." }, returns: "number|nil" },
    { name: "getOwner()", desc: { ru: "Информация о владельце.", en: "Owner info." }, returns: "table|nil" },
    { name: "getContainerInfo(x, y, z)", desc: { ru: "Содержимое контейнера.", en: "Container contents." }, returns: "table | false, reason" },
    { name: "storeHeldItemInContainer(x, y, z, slot)", desc: { ru: "Кладёт предмет в контейнер.", en: "Stores item in container." }, returns: "true", tags: ["fuel", "range"] },
    { name: "grabItemFromContainer(x, y, z, slot)", desc: { ru: "Берёт предмет из контейнера.", en: "Grabs from container." }, returns: "true", tags: ["fuel", "range"] }
  ],
  events: [
    { name: "setEventsEnabled(enabled)", desc: { ru: "Включает/выключает события.", en: "Enables/disables events." }, returns: "true", params: [{ name: "enabled", type: "boolean", desc: { ru: "Включить/выключить", en: "Enable/disable" } }] },
    { name: "isEventsEnabled()", desc: { ru: "Включены ли события.", en: "Are events enabled." }, returns: "boolean" },
    { name: "setEntityTrackRadius(radius)", desc: { ru: "Радиус трекинга.", en: "Tracking radius." }, returns: "true", params: [{ name: "radius", type: "number", desc: { ru: "Радиус", en: "Radius" } }] },
    { name: "getEntityTrackRadius()", desc: { ru: "Текущий радиус трекинга.", en: "Current tracking radius." }, returns: "number" },
    { name: "getTrackedEntities()", desc: { ru: "Список отслеживаемых сущностей.", en: "Tracked entity list." }, returns: "table" },
    { name: "resetEntityTracking()", desc: { ru: "Сбрасывает трекинг.", en: "Resets tracking." }, returns: "true" }
  ],
  inspection: [
    { name: "inspect(x, y, z)", desc: { ru: "Детальная информация о блоке.", en: "Detailed block info." }, returns: 'true, table|"air" | false, reason' },
    { name: "inspectFront()", desc: { ru: "Инспектирует блок спереди.", en: "Inspects block in front." }, returns: 'true, table|"air"' },
    { name: "inspectUp()", desc: { ru: "Инспектирует блок сверху.", en: "Inspects block above." }, returns: 'true, table|"air"' },
    { name: "inspectDown()", desc: { ru: "Инспектирует блок снизу.", en: "Inspects block below." }, returns: 'true, table|"air"' },
    { name: "getLight()", desc: { ru: "Уровень освещения.", en: "Light level." }, returns: "table — {block, sky, total}" },
    { name: "getBiome()", desc: { ru: "Биом на позиции.", en: "Biome at position." }, returns: "string" },
    { name: "getWeather()", desc: { ru: "Текущая погода.", en: "Current weather." }, returns: "table — {isRaining, isThundering}" },
    { name: "getTime()", desc: { ru: "Время в мире.", en: "World time." }, returns: "table" },
    { name: "canSeeSky()", desc: { ru: "Видит ли небо.", en: "Can see sky." }, returns: "boolean" },
    { name: "getDimension()", desc: { ru: "Измерение.", en: "Dimension." }, returns: "string" }
  ],
  position: [
    { name: "getPosition()", desc: { ru: "Позиция андроида.", en: "Android position." }, returns: "table", example: '-- Returns:\n{\n    x = 100.5, y = 64.0, z = 200.3,\n    blockX = 100, blockY = 64, blockZ = 200\n}' },
    { name: "getRotation()", desc: { ru: "Вращение андроида.", en: "Android rotation." }, returns: "table — {yaw, pitch, facing}" },
    { name: "lookAt(x, y, z)", desc: { ru: "Поворачивает голову к точке.", en: "Turns head to point." }, returns: "true" },
    { name: "lookAtEntity(uuid)", desc: { ru: "Поворачивает голову к сущности.", en: "Turns head to entity." }, returns: "true | false, reason" },
    { name: "turnLeft()", desc: { ru: "Поворот на 90° влево.", en: "Turn 90° left." }, returns: "true" },
    { name: "turnRight()", desc: { ru: "Поворот на 90° вправо.", en: "Turn 90° right." }, returns: "true" },
    { name: "turnAround()", desc: { ru: "Разворот на 180°.", en: "Turn 180°." }, returns: "true" },
    { name: "getDistanceTo(x, y, z)", desc: { ru: "Расстояние до точки.", en: "Distance to point." }, returns: "number" },
    { name: "isOnGround()", desc: { ru: "На земле ли.", en: "Is on ground." }, returns: "boolean" },
    { name: "isInWater()", desc: { ru: "В воде ли.", en: "Is in water." }, returns: "boolean" },
    { name: "isInLava()", desc: { ru: "В лаве ли.", en: "Is in lava." }, returns: "boolean" }
  ],
  status: [
    { name: "getHealth()", desc: { ru: "Информация о здоровье.", en: "Health info." }, returns: "table — {current, max, armor}", example: 'local h = android.getHealth()\nprint(h.current .. "/" .. h.max)' },
    { name: "isBurning()", desc: { ru: "Горит ли андроид.", en: "Is burning." }, returns: "boolean" },
    { name: "getVelocity()", desc: { ru: "Скорость андроида.", en: "Android velocity." }, returns: "table — {x, y, z, speed}" }
  ],
  sprint: [
    { name: "setSprinting(sprint)", desc: { ru: "Включает/выключает бег.", en: "Enables/disables sprinting." }, returns: "true", params: [{ name: "sprint", type: "boolean", desc: { ru: "Включить", en: "Enable" } }] },
    { name: "setSneaking(sneak)", desc: { ru: "Включает/выключает приседание.", en: "Enables/disables sneaking." }, returns: "true", params: [{ name: "sneak", type: "boolean", desc: { ru: "Включить", en: "Enable" } }] },
    { name: "isSprinting()", desc: { ru: "Бежит ли.", en: "Is sprinting." }, returns: "boolean" },
    { name: "isSneaking()", desc: { ru: "Приседает ли.", en: "Is sneaking." }, returns: "boolean" }
  ],
  chat: [
    { name: "sendChatMessage(message)", desc: { ru: "Отправляет сообщение в чат.", en: "Sends chat message." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст", en: "Text" } }] },
    { name: "emote(action)", desc: { ru: "Выполняет эмоцию.", en: "Performs emote." }, returns: "true", params: [{ name: "action", type: "string", desc: { ru: "Действие", en: "Action" } }], example: 'android.emote("dances")' },
    { name: "changeFace(faceName)", desc: { ru: "Меняет выражение лица.", en: "Changes face." }, returns: "true", params: [{ name: "faceName", type: "string", desc: { ru: "Название", en: "Name" } }] },
    { name: "playSound(soundName)", desc: { ru: "Проигрывает звук.", en: "Plays sound." }, returns: "true | false, reason", params: [{ name: "soundName", type: "string", desc: { ru: "ID звука", en: "Sound ID" } }] }
  ],
  skins: [
    { name: "setSkinByPlayer(playerName)", desc: { ru: "Загружает скин по имени игрока.", en: "Loads skin by player name." }, returns: "true, message", tags: ["async"], params: [{ name: "playerName", type: "string", desc: { ru: "Имя игрока", en: "Player name" } }] },
    { name: "setSkinByUUID(uuid)", desc: { ru: "Загружает скин по UUID.", en: "Loads skin by UUID." }, returns: "true, message", tags: ["async"] },
    { name: "setSkinByUrl(url)", desc: { ru: "Загружает скин по URL.", en: "Loads skin by URL." }, returns: "true, message", tags: ["async"] },
    { name: "clearSkin()", desc: { ru: "Сбрасывает скин.", en: "Resets skin." }, returns: "true" },
    { name: "getSkinInfo()", desc: { ru: "Информация о скине.", en: "Skin info." }, returns: "table|nil" },
    { name: "setSlimModel(slim)", desc: { ru: "Устанавливает тип модели.", en: "Sets model type." }, returns: "true", params: [{ name: "slim", type: "boolean", desc: { ru: "true=Alex, false=Steve", en: "true=Alex, false=Steve" } }] }
  ],
  fishing: [
    { name: "startFishing([maxCatch], [autoRecast])", desc: { ru: "Начинает рыбалку.", en: "Starts fishing." }, returns: "true | false, reason", tags: ["fuel"] },
    { name: "stopFishing()", desc: { ru: "Останавливает рыбалку.", en: "Stops fishing." }, returns: "true | false, reason" },
    { name: "getFishingInfo()", desc: { ru: "Информация о рыбалке.", en: "Fishing info." }, returns: "table|nil" },
    { name: "isNearWater()", desc: { ru: "Есть ли вода рядом.", en: "Is water nearby." }, returns: "boolean" }
  ],
  data: [
    { name: "dataSave(key, value)", desc: { ru: "Сохраняет значение.", en: "Saves value." }, returns: "true", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }, { name: "value", type: "any", desc: { ru: "Значение", en: "Value" } }] },
    { name: "dataLoad(key, [default])", desc: { ru: "Загружает значение.", en: "Loads value." }, returns: "any", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }] },
    { name: "dataExists(key)", desc: { ru: "Существует ли ключ.", en: "Does key exist." }, returns: "boolean", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }] },
    { name: "dataDelete(key)", desc: { ru: "Удаляет ключ.", en: "Deletes key." }, returns: "true", params: [{ name: "key", type: "string", desc: { ru: "Ключ", en: "Key" } }] },
    { name: "dataClear()", desc: { ru: "Очищает хранилище.", en: "Clears storage." }, returns: "true" },
    { name: "dataList()", desc: { ru: "Список ключей.", en: "Key list." }, returns: "table" },
    { name: "dataGetAll()", desc: { ru: "Все данные.", en: "All data." }, returns: "table" }
  ],
  debug: [
    { name: "log(message)", desc: { ru: "Пишет в лог.", en: "Writes to log." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст", en: "Text" } }], example: 'android.log("Starting work")' },
    { name: "logWarning(message)", desc: { ru: "Пишет предупреждение.", en: "Writes warning." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст", en: "Text" } }] },
    { name: "logError(message)", desc: { ru: "Пишет ошибку.", en: "Writes error." }, returns: "true", params: [{ name: "message", type: "string", desc: { ru: "Текст", en: "Text" } }] }
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
  html = html.replace(/(--[^\n]*)/g, '<span class="cmt">$1</span>');
  html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
  const kws = ['local','if','then','else','elseif','end','for','do','while','repeat','until','function','return','and','or','not','in','true','false','nil','break'];
  kws.forEach(kw => {
    html = html.replace(new RegExp('\\b(' + kw + ')\\b', 'g'), '<span class="kw">$1</span>');
  });
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');
  html = html.replace(/(\w+)(\()/g, '<span class="fn">$1</span>$2');
  return html;
}

function getTotalMethods() {
  let total = 0;
  for (const key in apiData) total += apiData[key].length;
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
      return m.name.toLowerCase().includes(q) || (m.desc[currentLang] || '').toLowerCase().includes(q);
    });
    if (methods.length > 0) {
      filteredData[key] = methods;
      totalFiltered += methods.length;
    }
  }

  // Sidebar nav
  let sidebarNav = '';
  for (const key of categoryKeys) {
    const count = apiData[key].length;
    const dimStyle = filteredData[key] ? '' : 'style="opacity:0.3"';
    sidebarNav += '<a class="nav-item" href="#cat-' + key + '" ' + dimStyle + ' onclick="closeSidebar()">' +
      '<span class="nav-item-left">' + t('categories.' + key) + '</span>' +
      '<span class="nav-count">' + count + '</span></a>';
  }

  // Content
  let contentHtml = '';
  if (totalFiltered === 0 && searchQuery) {
    contentHtml = '<div class="no-results"><div class="emoji">🔍</div><p>' + t('noResults') + '</p><p style="font-size:13px;margin-top:8px">' + t('noResultsDesc') + '</p></div>';
  } else {
    for (const key in filteredData) {
      const methods = filteredData[key];
      let methodsHtml = '';

      for (const m of methods) {
        const isOpen = openMethods.has(m.name);
        const openClass = isOpen ? 'open' : '';
        let tagsHtml = '';
        if (m.tags) {
          m.tags.forEach(function(tag) {
            const labels = { fuel: '⛽', async: '⚡', range: '📏' };
            tagsHtml += '<span class="tag tag-' + tag + '">' + (labels[tag] || tag) + '</span>';
          });
        }

        const brief = m.desc[currentLang] || '';
        const shortBrief = brief.length > 50 ? brief.substring(0, 50) + '...' : brief;

        let bodyHtml = '<div class="method-desc">' + brief + '</div>';

        // Params
        if (m.params && m.params.length > 0) {
          let hasDefault = m.params.some(function(p) { return p.default; });
          bodyHtml += '<div class="params-section"><div class="params-label">' + t('params') + '</div><table class="params-table"><tr><th>' + t('param') + '</th><th>' + t('type') + '</th>' + (hasDefault ? '<th>' + t('default') + '</th>' : '') + '<th>' + t('description') + '</th></tr>';
          for (const p of m.params) {
            const pdesc = (p.desc && p.desc[currentLang]) || '';
            bodyHtml += '<tr><td>' + p.name + '</td><td>' + p.type + '</td>' + (hasDefault ? '<td>' + (p.default || '—') + '</td>' : '') + '<td>' + pdesc + '</td></tr>';
          }
          bodyHtml += '</table></div>';
        }

        // Returns
        if (m.returns) {
          bodyHtml += '<div class="returns-line"><span class="returns-label">' + t('returns') + ':</span><span class="returns-value">' + escapeHtml(m.returns) + '</span></div>';
        }

        // Fuel
        if (m.tags && m.tags.includes('fuel')) {
          bodyHtml += '<div class="requires-line">⛽ ' + t('requires') + ': fuel</div>';
        }

        // Exceptions
        if (m.exceptions) {
          const exc = m.exceptions[currentLang] || '';
          bodyHtml += '<div class="requires-line" style="color:#999">⚠️ ' + t('exceptions') + ': ' + exc + '</div>';
        }

        // Events
        if (m.events) {
          const ev = m.events[currentLang] || '';
          bodyHtml += '<div class="requires-line" style="color:#bbb">📢 ' + t('events') + ': ' + ev + '</div>';
        }

        // Example
        if (m.example) {
          bodyHtml += '<div class="code-block"><div class="code-header"><span>Lua — ' + t('example') + '</span><button class="copy-btn" onclick="copyCode(this, event)">' + t('copy') + '</button></div><div class="code-content"><pre>' + highlightLua(m.example) + '</pre></div></div>';
        }

        const safeName = m.name.replace(/[^a-zA-Z0-9]/g, '_');
        methodsHtml += '<div class="method-card ' + openClass + '" id="method-' + safeName + '">' +
          '<div class="method-header" onclick="toggleMethod(\'' + m.name.replace(/'/g, "\\'") + '\')">' +
          '<span class="method-name">' + m.name + '</span>' +
          '<div class="method-header-right"><span class="method-brief">' + shortBrief + '</span><div class="method-tags">' + tagsHtml + '</div><span class="chevron">▼</span></div>' +
          '</div><div class="method-body">' + bodyHtml + '</div></div>';
      }

      contentHtml += '<div class="category-section" id="cat-' + key + '"><div class="category-header"><h2>' + t('categories.' + key) + '</h2><span class="category-badge">' + methods.length + ' ' + t('methods') + '</span></div>' + methodsHtml + '</div>';
    }

    // Limits
    var limitsData = [
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
      { ru: 'Макс. длина лог-сообщения', en: 'Max log length', val: '512' },
      { ru: 'Макс. топливо', en: 'Max fuel', val: '10000' }
    ];
    var limitsRows = '';
    limitsData.forEach(function(l) { limitsRows += '<tr><td>' + l[currentLang] + '</td><td>' + l.val + '</td></tr>'; });

    contentHtml += '<div class="limits-section" id="cat-limits"><div class="category-header"><h2>⚠️ ' + t('limits') + '</h2></div><table class="limits-table"><tr><th>' + t('parameter') + '</th><th>' + t('value') + '</th></tr>' + limitsRows + '</table></div>';

    // Summary
    var summaryRows = '';
    var totalAll = 0;
    for (var ci = 0; ci < categoryKeys.length; ci++) {
      var ck = categoryKeys[ci];
      var cnt = apiData[ck].length;
      totalAll += cnt;
      summaryRows += '<tr><td>' + t('categories.' + ck) + '</td><td>' + cnt + '</td></tr>';
    }
    summaryRows += '<tr><td><strong>' + t('total') + '</strong></td><td><strong>' + totalAll + '</strong></td></tr>';

    contentHtml += '<div class="limits-section" id="cat-summary" style="margin-top:32px"><div class="category-header"><h2>📊 ' + t('summary') + '</h2></div><table class="summary-table"><tr><th>' + t('category') + '</th><th>' + t('count') + '</th></tr>' + summaryRows + '</table></div>';
  }

  var particlesToggleClass = particlesEnabled ? 'particles-toggle active' : 'particles-toggle';

  app.innerHTML = '<div class="overlay" id="overlay" onclick="closeSidebar()"></div>' +
    '<div class="layout">' +
    '<aside class="sidebar" id="sidebar"><div class="sidebar-header"><div class="sidebar-logo"><span class="emoji">🤖</span><span>CC: Android Rework</span></div><div class="sidebar-subtitle">API Reference v1.0</div></div><nav class="sidebar-nav">' + sidebarNav + '</nav></aside>' +
    '<main class="main-content"><div class="topbar"><button class="menu-btn" onclick="toggleSidebar()">☰</button>' +
    '<div class="search-box"><span class="search-icon">🔍</span><input type="text" id="searchInput" placeholder="' + t('search') + '" value="' + searchQuery + '" oninput="onSearch(this.value)"></div>' +
    '<div class="topbar-right">' +
    '<div class="' + particlesToggleClass + '" onclick="toggleParticles()"><span class="dot"></span>' + t('particles') + '</div>' +
    '<div class="lang-switcher"><button class="lang-btn ' + (currentLang === 'ru' ? 'active' : '') + '" onclick="setLang(\'ru\')">RU</button><button class="lang-btn ' + (currentLang === 'en' ? 'active' : '') + '" onclick="setLang(\'en\')">EN</button></div>' +
    '<span class="method-count-badge">' + getTotalMethods() + ' ' + t('methods') + '</span></div></div>' +
    '<div class="content-area"><div class="hero"><h1>🤖 <span>' + t('heroTitle') + '</span></h1><p class="hero-desc">' + t('heroDesc') + '</p></div>' + contentHtml + '</div></main></div>' +
    '<button class="back-to-top" id="backToTop" onclick="window.scrollTo({top:0,behavior:\'smooth\'})">↑</button>';

  var si = document.getElementById('searchInput');
  if (si && searchQuery) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
}

// ===== ACTIONS =====
function toggleMethod(name) {
  if (openMethods.has(name)) openMethods.delete(name);
  else openMethods.add(name);
  render();
}

var searchTimeout;
function onSearch(val) {
  searchQuery = val;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(render, 150);
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
  var pre = btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).then(function() {
    btn.textContent = t('copied');
    setTimeout(function() { btn.textContent = t('copy'); }, 1500);
  });
}

window.addEventListener('scroll', function() {
  var btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

// ===== INIT =====
render();
initParticles();
