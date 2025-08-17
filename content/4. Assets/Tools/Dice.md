<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D&D Dice Roller & Character Generator</title>
    <style>
        .dice-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: var(--background-primary, #1e1e1e);
            color: var(--text-normal, #dcddde);
            border-radius: 12px;
        }

        .dice-title {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.2em;
            font-weight: bold;
            color: var(--text-accent, #7c3aed);
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .dice-section {
            background: var(--background-secondary, rgba(255, 255, 255, 0.05));
            border: 1px solid var(--background-modifier-border, rgba(255, 255, 255, 0.1));
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .dice-section h2 {
            margin-bottom: 16px;
            color: var(--text-accent, #ffd700);
            border-bottom: 2px solid var(--text-accent, #ffd700);
            padding-bottom: 8px;
            font-size: 1.4em;
        }

        .dice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
            gap: 12px;
            margin-bottom: 16px;
        }

        .character-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
        }

        .utility-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px;
        }

        .dice-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 8px;
            padding: 12px 8px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            text-align: center;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dice-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        .char-btn {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            border: none;
            border-radius: 8px;
            padding: 12px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .char-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
        }

        .utility-btn {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            border: none;
            border-radius: 8px;
            padding: 10px;
            color: white;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .utility-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .full-character-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            padding: 16px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin: 16px 0;
            transition: all 0.2s ease;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .full-character-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .result-display {
            background: var(--background-secondary, rgba(0, 0, 0, 0.3));
            border: 2px solid var(--text-accent, #ffd700);
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            display: none;
        }

        .result-display h3 {
            color: var(--text-accent, #ffd700);
            margin-bottom: 8px;
            font-size: 1.2em;
        }

        .result-text {
            font-size: 16px;
            line-height: 1.5;
        }

        .ability-scores {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .ability-score {
            background: var(--background-secondary, rgba(255, 255, 255, 0.1));
            padding: 8px;
            border-radius: 6px;
            text-align: center;
            font-size: 14px;
        }

        .ability-score strong {
            color: var(--text-accent, #ffd700);
        }

        .roll-history {
            max-height: 250px;
            overflow-y: auto;
            background: var(--background-secondary, rgba(0, 0, 0, 0.2));
            border-radius: 8px;
            padding: 12px;
            margin-top: 12px;
        }

        .history-item {
            padding: 6px 8px;
            margin-bottom: 4px;
            background: var(--background-primary, rgba(255, 255, 255, 0.08));
            border-radius: 4px;
            border-left: 3px solid var(--text-accent, #ffd700);
            font-size: 13px;
        }

        /* Obsidian specific adjustments */
        .theme-dark .dice-container {
            background: var(--background-primary);
            color: var(--text-normal);
        }

        .theme-light .dice-container {
            background: var(--background-primary);
            color: var(--text-normal);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            .dice-grid {
                grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
            }
            
            .character-grid, .utility-grid {
                grid-template-columns: 1fr 1fr;
            }
            
            .dice-title {
                font-size: 1.8em;
            }
            
            .dice-container {
                padding: 16px;
            }
        }

        @media (max-width: 480px) {
            .character-grid, .utility-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dice-container">
        <h1 class="dice-title">🎲 D&D Dice Roller & Character Generator</h1>
        
        <!-- Standard Dice Section -->
        <div class="dice-section">
            <h2>🎯 Standard Dice</h2>
            <div class="dice-grid">
                <button class="dice-btn" data-dice="1d4">d4</button>
                <button class="dice-btn" data-dice="1d6">d6</button>
                <button class="dice-btn" data-dice="1d8">d8</button>
                <button class="dice-btn" data-dice="1d10">d10</button>
                <button class="dice-btn" data-dice="1d12">d12</button>
                <button class="dice-btn" data-dice="1d20">d20</button>
                <button class="dice-btn" data-dice="1d100">d100</button>
                <button class="dice-btn" data-dice="2d6">2d6</button>
                <button class="dice-btn" data-dice="3d6">3d6</button>
                <button class="dice-btn" data-dice="4d6">4d6</button>
                <button class="dice-btn" data-action="advantage">Advantage</button>
                <button class="dice-btn" data-action="disadvantage">Disadvantage</button>
            </div>
        </div>

        <!-- Character Randomizer Section -->
        <div class="dice-section">
            <h2>🧙‍♂️ Character Randomizers</h2>
            <div class="character-grid">
                <button class="char-btn" data-action="random-class">🗡️ Random Class</button>
                <button class="char-btn" data-action="random-race">🧝‍♀️ Random Race</button>
                <button class="char-btn" data-action="random-alignment">⚖️ Random Alignment</button>
                <button class="char-btn" data-action="random-background">🎭 Random Background</button>
            </div>
            
            <button class="full-character-btn" data-action="full-character">
                ✨ Generate Complete Character ✨
            </button>
            
            <button class="char-btn" data-action="ability-scores" style="width: 100%; margin-top: 8px;">
                📊 Roll Ability Scores (4d6 drop lowest)
            </button>
        </div>

        <!-- Utility Dice Section -->
        <div class="dice-section">
            <h2>🎲 Utility Dice</h2>
            <div class="utility-grid">
                <button class="utility-btn" data-action="random-gender">👤 Gender</button>
                <button class="utility-btn" data-action="random-weather">🌤️ Weather</button>
                <button class="utility-btn" data-action="random-tavern">🏠 Tavern</button>
                <button class="utility-btn" data-action="random-encounter">⚔️ Encounter</button>
                <button class="utility-btn" data-action="coin-flip">🪙 Coin Flip</button>
                <button class="utility-btn" data-action="random-direction">🧭 Direction</button>
                <button class="utility-btn" data-action="random-damage">💥 Damage Type</button>
                <button class="utility-btn" data-action="wild-magic">🌟 Wild Magic</button>
            </div>
        </div>

        <!-- Results Display -->
        <div class="result-display" id="resultDisplay">
            <h3 id="resultTitle">🎯 Latest Result</h3>
            <div class="result-text" id="resultText"></div>
        </div>

        <!-- Roll History -->
        <div class="dice-section">
            <h2>📜 Roll History</h2>
            <div class="roll-history" id="rollHistory">
                <div class="history-item">Welcome! Your dice rolls will appear here.</div>
            </div>
            <button class="utility-btn" data-action="clear-history" style="margin-top: 8px;">Clear History</button>
        </div>
    </div>

    <script>
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializeDiceRoller();
        });

        function initializeDiceRoller() {
            // Data arrays
            const gameData = {
                classes: ['Fighter', 'Rogue', 'Wizard', 'Cleric', 'Ranger', 'Paladin', 'Barbarian', 'Bard', 'Sorcerer', 'Warlock', 'Druid', 'Monk', 'Artificer'],
                races: ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Tabaxi', 'Triton', 'Firbolg', 'Kenku', 'Lizardfolk', 'Tortle', 'Githyanki'],
                alignments: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],
                backgrounds: ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor', 'Urchin', 'Merchant', 'Scholar', 'Guard', 'Farmer', 'Innkeeper', 'Blacksmith', 'Hunter'],
                genders: ['Male', 'Female', 'Non-binary'],
                weather: ['Clear', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Snow', 'Fog', 'Windy', 'Storm'],
                taverns: ['The Prancing Pony', 'The Dragon\'s Rest', 'The Silver Stag', 'The Wanderer\'s Inn', 'The Golden Goblet', 'The Sleeping Giant', 'The Rusty Anchor', 'The Merry Merchant'],
                encounters: ['Combat', 'Social', 'Exploration', 'Puzzle', 'Trap', 'Environmental', 'Roleplay', 'Mystery'],
                directions: ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'],
                damageTypes: ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing']
            };

            // Utility functions
            function rollDie(sides) {
                return Math.floor(Math.random() * sides) + 1;
            }

            function rollDice(diceString) {
                const [count, sides] = diceString.split('d').map(Number);
                const rolls = [];
                let total = 0;
                
                for (let i = 0; i < count; i++) {
                    const roll = rollDie(sides);
                    rolls.push(roll);
                    total += roll;
                }
                
                return { total, rolls };
            }

            function randomFromArray(array) {
                return array[Math.floor(Math.random() * array.length)];
            }

            function displayResult(title, content = '') {
                const resultDisplay = document.getElementById('resultDisplay');
                const resultTitle = document.getElementById('resultTitle');
                const resultText = document.getElementById('resultText');
                
                if (resultDisplay && resultTitle && resultText) {
                    resultDisplay.style.display = 'block';
                    resultTitle.textContent = title;
                    resultText.innerHTML = content;
                    
                    // Smooth scroll to result
                    resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }

            function addToHistory(text) {
                const history = document.getElementById('rollHistory');
                if (!history) return;
                
                const timestamp = new Date().toLocaleTimeString();
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `<strong>${timestamp}:</strong> ${text}`;
                
                history.insertBefore(historyItem, history.firstChild);
                
                // Keep only last 15 entries
                while (history.children.length > 15) {
                    history.removeChild(history.lastChild);
                }
            }

            // Action handlers
            const actions = {
                'dice': function(diceString) {
                    const result = rollDice(diceString);
                    displayResult(`🎲 ${diceString}: ${result.total}`, `Rolls: [${result.rolls.join(', ')}]`);
                    addToHistory(`${diceString}: ${result.total}`);
                },

                'advantage': function() {
                    const roll1 = rollDie(20);
                    const roll2 = rollDie(20);
                    const result = Math.max(roll1, roll2);
                    displayResult(`🎲 Advantage: ${result}`, `Rolled ${roll1} and ${roll2}, keeping ${result}`);
                    addToHistory(`Advantage: ${result} (rolled ${roll1}, ${roll2})`);
                },

                'disadvantage': function() {
                    const roll1 = rollDie(20);
                    const roll2 = rollDie(20);
                    const result = Math.min(roll1, roll2);
                    displayResult(`🎲 Disadvantage: ${result}`, `Rolled ${roll1} and ${roll2}, keeping ${result}`);
                    addToHistory(`Disadvantage: ${result} (rolled ${roll1}, ${roll2})`);
                },

                'random-class': function() {
                    const result = randomFromArray(gameData.classes);
                    displayResult(`🗡️ Random Class: ${result}`);
                    addToHistory(`Random Class: ${result}`);
                },

                'random-race': function() {
                    const result = randomFromArray(gameData.races);
                    displayResult(`🧝‍♀️ Random Race: ${result}`);
                    addToHistory(`Random Race: ${result}`);
                },

                'random-alignment': function() {
                    const result = randomFromArray(gameData.alignments);
                    displayResult(`⚖️ Random Alignment: ${result}`);
                    addToHistory(`Random Alignment: ${result}`);
                },

                'random-background': function() {
                    const result = randomFromArray(gameData.backgrounds);
                    displayResult(`🎭 Random Background: ${result}`);
                    addToHistory(`Random Background: ${result}`);
                },

                'full-character': function() {
                    const charClass = randomFromArray(gameData.classes);
                    const race = randomFromArray(gameData.races);
                    const alignment = randomFromArray(gameData.alignments);
                    const background = randomFromArray(gameData.backgrounds);
                    
                    const character = `
                        <strong>Class:</strong> ${charClass}<br>
                        <strong>Race:</strong> ${race}<br>
                        <strong>Alignment:</strong> ${alignment}<br>
                        <strong>Background:</strong> ${background}
                    `;
                    
                    displayResult('🎭 Complete Character Generated!', character);
                    addToHistory(`Generated Character: ${charClass} ${race}, ${alignment}, ${background}`);
                },

                'ability-scores': function() {
                    const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
                    const scores = [];
                    
                    for (let ability of abilities) {
                        const rolls = [];
                        for (let i = 0; i < 4; i++) {
                            rolls.push(rollDie(6));
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
                },

                'random-gender': function() {
                    const result = randomFromArray(gameData.genders);
                    displayResult(`👤 Random Gender: ${result}`);
                    addToHistory(`Random Gender: ${result}`);
                },

                'random-weather': function() {
                    const result = randomFromArray(gameData.weather);
                    displayResult(`🌤️ Random Weather: ${result}`);
                    addToHistory(`Random Weather: ${result}`);
                },

                'random-tavern': function() {
                    const result = randomFromArray(gameData.taverns);
                    displayResult(`🏠 Random Tavern: ${result}`);
                    addToHistory(`Random Tavern: ${result}`);
                },

                'random-encounter': function() {
                    const result = randomFromArray(gameData.encounters);
                    displayResult(`⚔️ Random Encounter: ${result}`);
                    addToHistory(`Random Encounter: ${result}`);
                },

                'coin-flip': function() {
                    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
                    displayResult(`🪙 Coin Flip: ${result}`);
                    addToHistory(`Coin Flip: ${result}`);
                },

                'random-direction': function() {
                    const result = randomFromArray(gameData.directions);
                    displayResult(`🧭 Random Direction: ${result}`);
                    addToHistory(`Random Direction: ${result}`);
                },

                'random-damage': function() {
                    const result = randomFromArray(gameData.damageTypes);
                    displayResult(`💥 Random Damage Type: ${result}`);
                    addToHistory(`Random Damage Type: ${result}`);
                },

                'wild-magic': function() {
                    const roll = rollDie(20);
                    const surge = roll === 1 ? 'WILD MAGIC SURGE!' : 'No surge';
                    displayResult(`🌟 Wild Magic Check: ${roll}`, surge);
                    addToHistory(`Wild Magic: ${roll} - ${surge}`);
                },

                'clear-history': function() {
                    const history = document.getElementById('rollHistory');
                    if (history) {
                        history.innerHTML = '<div class="history-item">History cleared. New rolls will appear here.</div>';
                    }
                }
            };

            // Event delegation for all buttons
            document.addEventListener('click', function(e) {
                const button = e.target.closest('[data-dice], [data-action]');
                if (!button) return;

                e.preventDefault();
                
                if (button.dataset.dice) {
                    actions.dice(button.dataset.dice);
                } else if (button.dataset.action && actions[button.dataset.action]) {
                    actions[button.dataset.action]();
                }
            });
        }
    </script>
</body>
</html>