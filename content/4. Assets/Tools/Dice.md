<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D&D Dice Roller & Character Generator</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            padding: 20px;
            color: #fff;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            font-size: 2.5em;
        }

        .section {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .section h2 {
            margin-bottom: 20px;
            color: #ffd700;
            border-bottom: 2px solid #ffd700;
            padding-bottom: 10px;
        }

        .dice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .dice-button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border: none;
            border-radius: 10px;
            padding: 15px 10px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .dice-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            background: linear-gradient(45deg, #ee5a24, #ff6b6b);
        }

        .dice-button:active {
            transform: translateY(0);
        }

        .character-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .char-button {
            background: linear-gradient(45deg, #10ac84, #00d2d3);
            border: none;
            border-radius: 10px;
            padding: 15px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .char-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            background: linear-gradient(45deg, #00d2d3, #10ac84);
        }

        .result-display {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            border: 2px solid #ffd700;
        }

        .result-display h3 {
            color: #ffd700;
            margin-bottom: 10px;
        }

        .result-text {
            font-size: 18px;
            line-height: 1.6;
        }

        .ability-scores {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .ability-score {
            background: rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 8px;
            text-align: center;
        }

        .ability-score strong {
            color: #ffd700;
        }

        .full-character {
            background: linear-gradient(45deg, #8e44ad, #3742fa);
            border: none;
            border-radius: 15px;
            padding: 20px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin: 20px 0;
            transition: all 0.3s ease;
            box-shadow: 0 6px 25px rgba(0,0,0,0.3);
        }

        .full-character:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }

        .utility-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
        }

        .utility-button {
            background: linear-gradient(45deg, #fd79a8, #fdcb6e);
            border: none;
            border-radius: 10px;
            padding: 12px;
            color: white;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .utility-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .roll-history {
            max-height: 300px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            padding: 15px;
            margin-top: 15px;
        }

        .history-item {
            padding: 8px;
            margin-bottom: 5px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            border-left: 3px solid #ffd700;
        }

        @media (max-width: 768px) {
            .dice-grid {
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            }
            
            .character-grid {
                grid-template-columns: 1fr;
            }
            
            h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎲 D&D Dice Roller & Character Generator</h1>
        
        <!-- Standard Dice Section -->
        <div class="section">
            <h2>🎯 Standard Dice</h2>
            <div class="dice-grid">
                <button class="dice-button" onclick="rollDice('1d4')">d4</button>
                <button class="dice-button" onclick="rollDice('1d6')">d6</button>
                <button class="dice-button" onclick="rollDice('1d8')">d8</button>
                <button class="dice-button" onclick="rollDice('1d10')">d10</button>
                <button class="dice-button" onclick="rollDice('1d12')">d12</button>
                <button class="dice-button" onclick="rollDice('1d20')">d20</button>
                <button class="dice-button" onclick="rollDice('1d100')">d100</button>
                <button class="dice-button" onclick="rollDice('2d6')">2d6</button>
                <button class="dice-button" onclick="rollDice('3d6')">3d6</button>
                <button class="dice-button" onclick="rollDice('4d6')">4d6</button>
                <button class="dice-button" onclick="rollAdvantage()">Advantage</button>
                <button class="dice-button" onclick="rollDisadvantage()">Disadvantage</button>
            </div>
        </div>

        <!-- Character Randomizer Section -->
        <div class="section">
            <h2>🧙‍♂️ Character Randomizers</h2>
            <div class="character-grid">
                <button class="char-button" onclick="randomClass()">🗡️ Random Class</button>
                <button class="char-button" onclick="randomRace()">🧝‍♀️ Random Race</button>
                <button class="char-button" onclick="randomAlignment()">⚖️ Random Alignment</button>
                <button class="char-button" onclick="randomBackground()">🎭 Random Background</button>
            </div>
            
            <button class="full-character" onclick="generateFullCharacter()">
                ✨ Generate Complete Character ✨
            </button>
            
            <button class="char-button" onclick="rollAbilityScores()" style="width: 100%; margin-top: 10px;">
                📊 Roll Ability Scores (4d6 drop lowest)
            </button>
        </div>

        <!-- Utility Dice Section -->
        <div class="section">
            <h2>🎲 Utility Dice</h2>
            <div class="utility-grid">
                <button class="utility-button" onclick="randomGender()">👤 Random Gender</button>
                <button class="utility-button" onclick="randomWeather()">🌤️ Random Weather</button>
                <button class="utility-button" onclick="randomTavern()">🏠 Random Tavern</button>
                <button class="utility-button" onclick="randomEncounter()">⚔️ Random Encounter</button>
                <button class="utility-button" onclick="coinFlip()">🪙 Coin Flip</button>
                <button class="utility-button" onclick="randomDirection()">🧭 Random Direction</button>
                <button class="utility-button" onclick="randomDamageType()">💥 Damage Type</button>
                <button class="utility-button" onclick="wildMagicSurge()">🌟 Wild Magic Check</button>
            </div>
        </div>

        <!-- Results Display -->
        <div class="result-display" id="resultDisplay" style="display: none;">
            <h3>🎯 Latest Result</h3>
            <div class="result-text" id="resultText"></div>
        </div>

        <!-- Roll History -->
        <div class="section">
            <h2>📜 Roll History</h2>
            <div class="roll-history" id="rollHistory">
                <div class="history-item">Welcome! Your dice rolls will appear here.</div>
            </div>
            <button class="utility-button" onclick="clearHistory()" style="margin-top: 10px;">Clear History</button>
        </div>
    </div>

    <script>
        // Dice rolling function
        function rollDice(diceString) {
            const result = parseDiceString(diceString);
            displayResult(`${diceString}: ${result.total}`, result.rolls);
            addToHistory(`${diceString}: ${result.total}`);
        }

        function parseDiceString(diceString) {
            const [count, sides] = diceString.split('d').map(Number);
            const rolls = [];
            let total = 0;
            
            for (let i = 0; i < count; i++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                rolls.push(roll);
                total += roll;
            }
            
            return { total, rolls };
        }

        function rollAdvantage() {
            const roll1 = Math.floor(Math.random() * 20) + 1;
            const roll2 = Math.floor(Math.random() * 20) + 1;
            const result = Math.max(roll1, roll2);
            displayResult(`Advantage: ${result}`, `Rolled ${roll1} and ${roll2}, keeping ${result}`);
            addToHistory(`Advantage: ${result} (rolled ${roll1}, ${roll2})`);
        }

        function rollDisadvantage() {
            const roll1 = Math.floor(Math.random() * 20) + 1;
            const roll2 = Math.floor(Math.random() * 20) + 1;
            const result = Math.min(roll1, roll2);
            displayResult(`Disadvantage: ${result}`, `Rolled ${roll1} and ${roll2}, keeping ${result}`);
            addToHistory(`Disadvantage: ${result} (rolled ${roll1}, ${roll2})`);
        }

        // Character generation arrays
        const classes = ['Fighter', 'Rogue', 'Wizard', 'Cleric', 'Ranger', 'Paladin', 'Barbarian', 'Bard', 'Sorcerer', 'Warlock', 'Druid', 'Monk', 'Artificer'];
        const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Tabaxi', 'Triton', 'Firbolg', 'Kenku', 'Lizardfolk', 'Tortle', 'Githyanki'];
        const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
        const backgrounds = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor', 'Urchin', 'Merchant', 'Scholar', 'Guard', 'Farmer', 'Innkeeper', 'Blacksmith', 'Hunter'];
        
        // Utility arrays
        const genders = ['Male', 'Female', 'Non-binary'];
        const weather = ['Clear', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Snow', 'Fog', 'Windy', 'Storm'];
        const taverns = ['The Prancing Pony', 'The Dragon\'s Rest', 'The Silver Stag', 'The Wanderer\'s Inn', 'The Golden Goblet', 'The Sleeping Giant', 'The Rusty Anchor', 'The Merry Merchant'];
        const encounters = ['Combat', 'Social', 'Exploration', 'Puzzle', 'Trap', 'Environmental', 'Roleplay', 'Mystery'];
        const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
        const damageTypes = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];

        function randomFromArray(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        function randomClass() {
            const result = randomFromArray(classes);
            displayResult(`Random Class: ${result}`);
            addToHistory(`Random Class: ${result}`);
        }

        function randomRace() {
            const result = randomFromArray(races);
            displayResult(`Random Race: ${result}`);
            addToHistory(`Random Race: ${result}`);
        }

        function randomAlignment() {
            const result = randomFromArray(alignments);
            displayResult(`Random Alignment: ${result}`);
            addToHistory(`Random Alignment: ${result}`);
        }

        function randomBackground() {
            const result = randomFromArray(backgrounds);
            displayResult(`Random Background: ${result}`);
            addToHistory(`Random Background: ${result}`);
        }

        function generateFullCharacter() {
            const charClass = randomFromArray(classes);
            const race = randomFromArray(races);
            const alignment = randomFromArray(alignments);
            const background = randomFromArray(backgrounds);
            
            const character = `
                <strong>Class:</strong> ${charClass}<br>
                <strong>Race:</strong> ${race}<br>
                <strong>Alignment:</strong> ${alignment}<br>
                <strong>Background:</strong> ${background}
            `;
            
            displayResult('🎭 Complete Character Generated!', character);
            addToHistory(`Generated Character: ${charClass} ${race}, ${alignment}, ${background}`);
        }

        function rollAbilityScores() {
            const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
            const scores = [];
            
            for (let ability of abilities) {
                const rolls = [];
                for (let i = 0; i < 4; i++) {
                    rolls.push(Math.floor(Math.random() * 6) + 1);
                }
                rolls.sort((a, b) => b - a);
                const score = rolls[0] + rolls[1] + rolls[2]; // Drop the lowest
                scores.push({ability, score});
            }
            
            let scoresHTML = '<div class="ability-scores">';
            scores.forEach(({ability, score}) => {
                scoresHTML += `<div class="ability-score"><strong>${ability}:</strong> ${score}</div>`;
            });
            scoresHTML += '</div>';
            
            displayResult('📊 Ability Scores (4d6, drop lowest)', scoresHTML);
            addToHistory(`Ability Scores: ${scores.map(s => `${s.ability}: ${s.score}`).join(', ')}`);
        }

        // Utility functions
        function randomGender() {
            const result = randomFromArray(genders);
            displayResult(`Random Gender: ${result}`);
            addToHistory(`Random Gender: ${result}`);
        }

        function randomWeather() {
            const result = randomFromArray(weather);
            displayResult(`Random Weather: ${result}`);
            addToHistory(`Random Weather: ${result}`);
        }

        function randomTavern() {
            const result = randomFromArray(taverns);
            displayResult(`Random Tavern: ${result}`);
            addToHistory(`Random Tavern: ${result}`);
        }

        function randomEncounter() {
            const result = randomFromArray(encounters);
            displayResult(`Random Encounter: ${result}`);
            addToHistory(`Random Encounter: ${result}`);
        }

        function coinFlip() {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            displayResult(`Coin Flip: ${result}`);
            addToHistory(`Coin Flip: ${result}`);
        }

        function randomDirection() {
            const result = randomFromArray(directions);
            displayResult(`Random Direction: ${result}`);
            addToHistory(`Random Direction: ${result}`);
        }

        function randomDamageType() {
            const result = randomFromArray(damageTypes);
            displayResult(`Random Damage Type: ${result}`);
            addToHistory(`Random Damage Type: ${result}`);
        }

        function wildMagicSurge() {
            const roll = Math.floor(Math.random() * 20) + 1;
            const surge = roll === 1 ? 'WILD MAGIC SURGE!' : 'No surge';
            displayResult(`Wild Magic Check: ${roll} - ${surge}`);
            addToHistory(`Wild Magic: ${roll} - ${surge}`);
        }

        // Display functions
        function displayResult(title, content = '') {
            const resultDisplay = document.getElementById('resultDisplay');
            const resultText = document.getElementById('resultText');
            
            resultDisplay.style.display = 'block';
            resultText.innerHTML = `<strong>${title}</strong>${content ? '<br>' + content : ''}`;
            
            // Scroll to result
            resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function addToHistory(text) {
            const history = document.getElementById('rollHistory');
            const timestamp = new Date().toLocaleTimeString();
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `<strong>${timestamp}:</strong> ${text}`;
            
            history.insertBefore(historyItem, history.firstChild);
            
            // Keep only last 20 entries
            while (history.children.length > 20) {
                history.removeChild(history.lastChild);
            }
        }

        function clearHistory() {
            const history = document.getElementById('rollHistory');
            history.innerHTML = '<div class="history-item">History cleared. New rolls will appear here.</div>';
        }
    </script>
</body>
</html>
