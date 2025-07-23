document.addEventListener('DOMContentLoaded', function() {

// Quiz-Daten (PC-Grundlagen)
    const quizData = {
        "meta": {
            "title": "PC-Grundlagen Quiz", // Meta title changed
            "contributors": []
        },
        "quiz": {
            "PC-Grundlagen": { // Single category created
                "1": {
                    "question": "Wofür steht RAM?",
                    "answers": {
                        "A": "Read Access Memory",
                        "B": "Random Access Memory",
                        "C": "Realtime Application Module",
                        "D": "Rapid Action Memory"
                    },
                    "right": ["B"] // Correct answer key
                },
                "2": {
                    "question": "Kann auf den Festplattenspeicher oder auf den Arbeitsspeicher schneller zugegriffen werden?",
                    "answers": {
                        "A": "Festplattenspeicher",
                        "B": "Arbeitsspeicher",
                        "C": "Beide sind gleich schnell",
                        "D": "Das hängt vom Betriebssystem ab"
                    },
                    "right": ["B"]
                },
                "3": {
                    "question": "Was ist der Unterschied zwischen PCIe und AGP?",
                    "answers": {
                        "A": "Es sind Schnittstellen für Prozessoren, wobei PCIe neuer ist.",
                        "B": "Es sind beides Arten von Festplattenanschlüssen mit unterschiedlicher Geschwindigkeit.",
                        "C": "Es sind Schnittstellen für Grafikkarten, wobei AGP generell schneller ist.",
                        "D": "Es sind Schnittstellen für Grafikkarten, wobei PCIe schnellere Übertragungen ermöglicht."
                    },
                    "right": ["D"]
                },
                "4": {
                    "question": "Welche Komponenten sind für einen Start des Computers (Bootvorgang) mindestens wichtig?",
                    "answers": {
                        "A": "Mainboard, CPU, Grafikkarte, Maus, Tastatur",
                        "B": "CPU, Arbeitsspeicher, Netzteil, Monitor, Gehäuse",
                        "C": "Mainboard, CPU, Arbeitsspeicher, Festplatte, Netzteil",
                        "D": "Arbeitsspeicher, Festplatte, Netzteil, Soundkarte, Drucker"
                    },
                    "right": ["C"]
                },
                "5": {
                    "question": "Wofür steht die MHz bzw. GHz Angabe bei einem Prozessor?",
                    "answers": {
                        "A": "Für die Speicherkapazität des integrierten Caches.",
                        "B": "Für die Taktfrequenz, mit der die CPU (Prozessor) arbeitet.",
                        "C": "Für die Anzahl der Prozessorkerne.",
                        "D": "Für den maximalen Stromverbrauch des Prozessors unter Last."
                    },
                    "right": ["B"]
                },
                "6": {
                    "question": "Was ist eine andere (englische) Bezeichnung für einen Prozessor?",
                    "answers": {
                        "A": "GPU",
                        "B": "RAM",
                        "C": "PSU",
                        "D": "CPU"
                    },
                    "right": ["D"]
                },
                "7": {
                    "question": "Wie hoch ist die Mindestvoraussetzung an Arbeitsspeicher beim Betriebssystem Windows 7 (laut Quelle, die sich auf Win 8 bezieht)?",
                    "answers": {
                        "A": "512 MB",
                        "B": "1 Gigabyte (32-Bit) oder 2 GB (64-Bit)",
                        "C": "4 GB (32-Bit) oder 8 GB (64-Bit)",
                        "D": "Immer 4 GB, unabhängig von der Version"
                    },
                    "right": ["B"]
                },
                "8": {
                    "question": "Wofür steht BIOS?",
                    "answers": {
                        "A": "Binary Integrated Operating System",
                        "B": "Basic Input/Output System",
                        "C": "Basic Interface Operating Software",
                        "D": "Boot Information Organizing System"
                    },
                    "right": ["B"]
                },
                "9": {
                    "question": "Welche Aufgabe hat das Mainboard/Motherboard?",
                    "answers": {
                        "A": "Es führt hauptsächlich die Berechnungen im Computer durch.",
                        "B": "Es speichert alle Daten dauerhaft, auch ohne Strom.",
                        "C": "Es ist primär für die Stromversorgung der Komponenten zuständig.",
                        "D": "Es ist die Hauptplatine und verbindet alle anderen PC-Komponenten miteinander."
                    },
                    "right": ["D"]
                },
                "10": {
                    "question": "Welchen Durchmesser sollten Gehäuselüfter idealerweise haben, um leise zu sein?",
                    "answers": {
                        "A": "Möglichst klein, da kleine Lüfter weniger Strom brauchen.",
                        "B": "Immer 80mm, das ist der Standard.",
                        "C": "Je größer der Durchmesser, desto leiser kann der Lüfter bei gleicher Luftfördermenge sein.",
                        "D": "Der Durchmesser ist für die Lautstärke irrelevant, nur die Drehzahl zählt."
                    },
                    "right": ["C"]
                },
                "11": {
                    "question": "Welches Utensil sollte man beim PC-Eigenbau benutzen, um elektrostatische Entladungen auf die Hardware zu vermeiden?",
                    "answers": {
                        "A": "Ein magnetisches Schraubendreher-Set",
                        "B": "Ein Erdungsarmband",
                        "C": "Gummihandschuhe",
                        "D": "Eine Taschenlampe"
                    },
                    "right": ["B"]
                },
                "12": {
                    "question": "Wie hoch ist die theoretische Datentransferrate beim WLAN-Standard 802.11n?",
                    "answers": {
                        "A": "54 Mbit/s",
                        "B": "150 Mbit/s",
                        "C": "600 Mbit/s",
                        "D": "1000 Mbit/s (1 Gbit/s)"
                    },
                    "right": ["C"]
                },
                "13": {
                    "question": "Was ist ein Crossover-Kabel?",
                    "answers": {
                        "A": "Ein Standard-Netzwerkkabel zur Verbindung eines PCs mit einem Switch oder Router.",
                        "B": "Ein Netzwerkkabel mit gekreuzten Adernpaaren zur direkten Verbindung gleichartiger Geräte (z.B. PC zu PC).",
                        "C": "Ein spezielles Kabel zur Verbindung von Monitor und Grafikkarte.",
                        "D": "Ein Adapterkabel von USB auf Netzwerkanschluss."
                    },
                    "right": ["B"]
                },
                "14": {
                    "question": "Was ist der Unterschied zwischen Router und Switch?",
                    "answers": {
                        "A": "Ein Switch verbindet unterschiedliche Netzwerke, ein Router erweitert ein bestehendes Netzwerk.",
                        "B": "Beide Geräte haben exakt dieselbe Funktion und sind austauschbar.",
                        "C": "Ein Router verbindet unterschiedliche Netzwerke ( fungiert als \"Wegefinder\"), ein Switch erweitert ein bestehendes Netzwerk (verteilt Daten innerhalb eines Netzes).",
                        "D": "Ein Router ist nur für WLAN zuständig, ein Switch nur für kabelgebundene Verbindungen."
                    },
                    "right": ["C"]
                },
                "15": {
                    "question": "Welche Merkmale hat ein sicheres Passwort?",
                    "answers": {
                        "A": "Es sollte mindestens 6 Zeichen lang sein und nur aus Kleinbuchstaben bestehen.",
                        "B": "Es sollte ein leicht zu merkendes Wort sein, z.B. der Name des Haustiers.",
                        "C": "Es sollte eine Kombination aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen sein und keine Wörterbuchwörter enthalten.",
                        "D": "Es sollte der eigene Geburtstag oder der Benutzername rückwärts sein."
                    },
                    "right": ["C"]
                },
                "16": {
                    "question": "Wie viele GB Speicher hat eine Blu-Ray Disc mit einer Lage (Single Layer) maximal?",
                    "answers": {
                        "A": "4.7 GB",
                        "B": "25 GB",
                        "C": "50 GB",
                        "D": "100 GB"
                    },
                    "right": ["B"]
                },
                "17": {
                    "question": "Warum ist es wichtig regelmäßig im Computer-Inneren den Staub zu entfernen?",
                    "answers": {
                        "A": "Staub kann die Software beschädigen und zu Programmabstürzen führen.",
                        "B": "Angesammelter Staub behindert die Kühlung der Komponenten, was zu Überhitzung und Leistungseinbußen führen kann.",
                        "C": "Staubpartikel können die Lesegeschwindigkeit der Festplatte verlangsamen.",
                        "D": "Es ist hauptsächlich eine ästhetische Frage, damit der PC innen sauber aussieht."
                    },
                    "right": ["B"]
                },
                "18": {
                    "question": "Wofür ist Wärmeleitpaste da?",
                    "answers": {
                        "A": "Um den Prozessor (CPU) auf dem Mainboard festzukleben.",
                        "B": "Um eine bessere elektrische Isolierung zwischen CPU und Kühler zu schaffen.",
                        "C": "Um mikroskopische Unebenheiten zwischen CPU und Kühlkörper auszugleichen und so die Wärmeableitung zu optimieren.",
                        "D": "Um den Lüfter des Kühlkörpers schneller drehen zu lassen."
                    },
                    "right": ["C"]
                },
                "19": {
                    "question": "Mit welcher der folgenden Schnittstellen lassen sich theoretisch am schnellsten Daten übertragen? (Basierend auf den Angaben im Quelltext)",
                    "answers": {
                        "A": "ATA",
                        "B": "USB 2.0",
                        "C": "USB 3.0 (mit 4.000 Mbit/s laut Quelle)",
                        "D": "SATA (mit 6 Gbit/s laut Quelle)"
                    },
                    "right": ["D"]
                },
                "20": {
                    "question": "Warum ist eine kabellose Tastatur/Maus laut Quelle eher ungeeignet für Spieler?",
                    "answers": {
                        "A": "Sie sind generell unpräziser als kabelgebundene Modelle.",
                        "B": "Ihre Funkreichweite ist meist zu gering für typische Spielentfernungen.",
                        "C": "Die Notwendigkeit, Batterien zu wechseln oder Akkus aufzuladen, kann mitten im Spiel stören.",
                        "D": "Sie verursachen oft Konflikte mit anderen Funkgeräten im Haushalt."
                    },
                    "right": ["C"]
                },
                "21": {
                    "question": "Was nützt die Defragmentierung im Betriebssystem Windows (bei herkömmlichen HDDs)?",
                    "answers": {
                        "A": "Sie löscht Viren und Malware von der Festplatte.",
                        "B": "Sie überprüft die Festplatte auf physikalische Fehler und markiert defekte Sektoren.",
                        "C": "Sie ordnet zerstückelte (fragmentierte) Dateien auf der Festplatte neu an, um Lese- und Schreibvorgänge zu beschleunigen.",
                        "D": "Sie verschlüsselt die Daten auf der Festplatte zum Schutz vor unbefugtem Zugriff."
                    },
                    "right": ["C"]
                },
                "22": {
                    "question": "Was für ein Gerät ist ein NAS?",
                    "answers": {
                        "A": "Ein Network Administration Server zur Verwaltung von Benutzerkonten.",
                        "B": "Ein Network Attached Storage: Ein Speichergerät, das ans Netzwerk angeschlossen wird.",
                        "C": "Eine Network Audio Station zum Streamen von Musik im Netzwerk.",
                        "D": "Ein Network Access Security device (eine Art Firewall)."
                    },
                    "right": ["B"]
                },
                "23": {
                    "question": "Nenne 2 Beispiele für Routing-Protokolle (laut Quelle).",
                    "answers": {
                        "A": "TCP und UDP",
                        "B": "HTTP und FTP",
                        "C": "RIP und IGRP",
                        "D": "SMTP und POP3"
                    },
                    "right": ["C"]
                },
                "24": {
                    "question": "Welche Vorteile hat ein LASER-Drucker gegenüber einem Tintenstrahldrucker (laut Quelle)?",
                    "answers": {
                        "A": "Deutlich besserer Fotodruck und geringere Anschaffungskosten.",
                        "B": "Höhere Druckgeschwindigkeit und oft niedrigere Druckkosten pro Seite.",
                        "C": "Kann ohne Aufwärmzeit sofort drucken und ist leiser im Betrieb.",
                        "D": "Geringerer Stromverbrauch und kleinere Bauform."
                    },
                    "right": ["B"]
                },
                "25": {
                    "question": "Wie hoch sollte die Watt-Leistung eines Netzteils sein?",
                    "answers": {
                        "A": "Immer der maximal verfügbare Wert, um sicherzugehen.",
                        "B": "Exakt so hoch wie der Verbrauch aller Komponenten zusammen, um Strom zu sparen.",
                        "C": "Sie muss ausreichen, um alle Komponenten stabil zu versorgen, idealerweise mit einem Puffer für Aufrüstungen.",
                        "D": "Sie sollte mindestens doppelt so hoch sein wie die Leistungsaufnahme der Grafikkarte."
                    },
                    "right": ["C"]
                }
            }
        }
    };

// --- Der Rest des Skripts bleibt größtenteils unverändert ---
// --- (DOM-Elemente, Zustandsvariablen, Event-Listener, Funktionen) ---

// DOM-Elemente (wie in der Originaldatei)
    const startScreen = document.getElementById('start-screen');
    const categoryScreen = document.getElementById('category-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const categoriesContainer = document.getElementById('categories-container');
    const randomCategoryBtn = document.getElementById('random-category-btn');
    const categoryDisplay = document.getElementById('category-display');
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const answerOptions = document.querySelectorAll('.answer-option');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackMessage = document.getElementById('feedback-message');
    const correctAnswers = document.getElementById('correct-answers');
    const nextBtn = document.getElementById('next-btn');
    const scoreDisplay = document.getElementById('score-display');
    const percentageDisplay = document.getElementById('percentage-display');
    const restartBtn = document.getElementById('restart-btn');
    const progressBar = document.getElementById('progress-bar');

// Quiz-Zustandsvariablen
    let categories = Object.keys(quizData.quiz);
    let currentCategory = null;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let selectedAnswers = []; // Stores selected answers for the current question
    let score = 0;
    let totalQuestions = 0;

// Event-Listener
    startBtn.addEventListener('click', showCategoryScreen);
    randomCategoryBtn.addEventListener('click', () => startQuiz('random'));
    submitBtn.addEventListener('click', checkAnswer);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

// Antwortoptionen auswählbar machen
    answerOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Since only one answer is correct, deselect others first
            selectedAnswers = [];
            answerOptions.forEach(opt => opt.classList.remove('selected'));
            // Select the clicked option
            const optionLetter = option.getAttribute('data-option');
            selectedAnswers.push(optionLetter);
            option.classList.add('selected');
        });
    });

// Funktion zum Hinzufügen des Home-Buttons (unverändert)
    function addHomeButton() {
        if (!document.getElementById('home-button')) {
            const homeButton = document.createElement('button');
            homeButton.id = 'home-button';
            homeButton.textContent = 'Zurück zur Startseite';
            homeButton.classList.add('chalk-btn');
            homeButton.addEventListener('click', () => {
                // Hide all screens except start screen
                quizScreen.classList.add('hidden');
                categoryScreen.classList.add('hidden');
                resultsScreen.classList.add('hidden');
                startScreen.classList.remove('hidden');
                // Remove dynamic buttons if they exist
                const backButton = document.getElementById('back-button');
                if (backButton) backButton.remove();
                const homeButton = document.getElementById('home-button');
                if (homeButton) homeButton.remove();
            });
            document.getElementById('submit-container').appendChild(homeButton);
        }
    }

// Funktion zum Hinzufügen des Lernmodus (unverändert)
    function addSequentialLearningCategory() {
        const sequentialCategoryBtn = document.createElement('button');
        sequentialCategoryBtn.textContent = 'Lernmodus';
        sequentialCategoryBtn.classList.add('category-btn');
        sequentialCategoryBtn.addEventListener('click', () => startSequentialLearning());
        categoriesContainer.appendChild(sequentialCategoryBtn);
    }

// Funktion für sequentielles Lernen (unverändert)
    function startSequentialLearning() {
        categoryScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        currentCategory = 'Lernmodus'; // Display category name
        currentQuestions = [];
        currentQuestionIndex = 0;
        score = 0;
        // Collect all questions sequentially
        categories.forEach(cat => {
            const categoryQuestions = Object.keys(quizData.quiz[cat]);
            categoryQuestions.sort((a, b) => parseInt(a) - parseInt(b)); // Sort questions by ID
            categoryQuestions.forEach(questionId => {
                currentQuestions.push({
                    category: cat, // Add category info
                    id: questionId,
                    ...quizData.quiz[cat][questionId]
                });
            });
        });
        totalQuestions = currentQuestions.length;
        showQuestion();
        addBackButton(); // Add back button for learning mode
        addHomeButton();
    }

// Funktion zum Hinzufügen des Zurück-Buttons (unverändert)
    function addBackButton() {
        const existingBackButton = document.getElementById('back-button');
        if (existingBackButton) existingBackButton.remove(); // Remove if exists

        const backButton = document.createElement('button');
        backButton.id = 'back-button';
        backButton.textContent = 'Zurück';
        backButton.classList.add('chalk-btn');
        backButton.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(); // Show previous question
            }
        });
        document.getElementById('submit-container').insertBefore(backButton, document.getElementById('submit-container').firstChild); // Add at the beginning
    }


// Funktionen (größtenteils unverändert, kleine Anpassungen)

    function showCategoryScreen() {
        startScreen.classList.add('hidden');
        quizScreen.classList.add('hidden'); // Hide quiz screen if coming back
        resultsScreen.classList.add('hidden'); // Hide results screen
        categoryScreen.classList.remove('hidden');
        // Remove dynamic buttons if they exist
        const backButton = document.getElementById('back-button');
        if (backButton) backButton.remove();
        const homeButton = document.getElementById('home-button');
        if (homeButton) homeButton.remove();

        categoriesContainer.innerHTML = ''; // Clear previous categories
        categories.forEach(category => {
            if (Object.keys(quizData.quiz[category]).length > 0) {
                const categoryBtn = document.createElement('button');
                categoryBtn.classList.add('category-btn');
                categoryBtn.textContent = category;
                categoryBtn.addEventListener('click', () => startQuiz(category));
                categoriesContainer.appendChild(categoryBtn);
            }
        });
        addSequentialLearningCategory(); // Add Lernmodus button
    }

    function startQuiz(category) {
        categoryScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        currentCategory = category; // Store the selected category name
        currentQuestions = [];
        currentQuestionIndex = 0;
        score = 0;

        if (category === 'random') {
            // Collect all questions from all categories for random mode
            let allQuestions = [];
            categories.forEach(cat => {
                const categoryQuestions = Object.keys(quizData.quiz[cat]);
                categoryQuestions.forEach(questionId => {
                    allQuestions.push({
                        category: cat, // Include category info
                        id: questionId,
                        ...quizData.quiz[cat][questionId]
                    });
                });
            });
            shuffleArray(allQuestions); // Shuffle all collected questions
            currentQuestions = allQuestions.slice(0, 10); // Limit to 10 random questions
            currentCategory = "Zufällige Fragen"; // Set display name for random
        } else {
            // Get questions from the specific selected category
            const categoryQuestions = Object.keys(quizData.quiz[category]);
            categoryQuestions.forEach(questionId => {
                currentQuestions.push({
                    category: category, // Include category info
                    id: questionId,
                    ...quizData.quiz[category][questionId]
                });
            });
            shuffleArray(currentQuestions); // Shuffle questions within the category
        }

        totalQuestions = currentQuestions.length;
        if (totalQuestions === 0) {
            // Handle case with no questions
            alert("Keine Fragen in dieser Kategorie gefunden!");
            showCategoryScreen();
            return;
        }
        showQuestion();
        addHomeButton(); // Add home button for quiz modes
        // Remove back button if it exists from Lernmodus
        const backButton = document.getElementById('back-button');
        if (backButton) backButton.remove();
    }


    function showQuestion() {
        progressBar.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`; // Update progress bar
        selectedAnswers = []; // Reset selected answers for the new question
        answerOptions.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect'); // Reset visual state
        });
        feedbackContainer.classList.add('hidden'); // Hide feedback from previous question
        nextBtn.classList.add('hidden'); // Hide next button
        submitBtn.disabled = false; // Enable submit button
        submitBtn.classList.remove('hidden'); // Show submit button

        const currentQuestionData = currentQuestions[currentQuestionIndex];
        categoryDisplay.textContent = currentQuestionData.category; // Show category
        questionContainer.textContent = `${currentQuestionIndex + 1}. ${currentQuestionData.question}`; // Show question number and text

        // Display answer options
        answerOptions.forEach(option => {
            const optionLetter = option.getAttribute('data-option');
            const optionTextSpan = option.querySelector('.option-text');
            if (currentQuestionData.answers[optionLetter]) {
                optionTextSpan.textContent = currentQuestionData.answers[optionLetter];
                option.style.display = ''; // Show option
            } else {
                optionTextSpan.textContent = '';
                option.style.display = 'none'; // Hide option if no text
            }
        });

        // Enable/disable back button in Lernmodus
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.disabled = currentQuestionIndex === 0;
        }
    }

    function checkAnswer() {
        submitBtn.disabled = true; // Prevent multiple submissions
        const currentQuestionData = currentQuestions[currentQuestionIndex];
        const correctAnswerLetters = currentQuestionData.right; // This is an array e.g., ["B"]

        let isCorrect = false;
        if (selectedAnswers.length === 1 && correctAnswerLetters.includes(selectedAnswers[0])) {
            isCorrect = true;
            score++;
        }

        // Visual feedback for options
        answerOptions.forEach(option => {
            const optionLetter = option.getAttribute('data-option');
            if (correctAnswerLetters.includes(optionLetter)) {
                option.classList.add('correct'); // Highlight correct answer(s)
            }
            if (selectedAnswers.includes(optionLetter) && !correctAnswerLetters.includes(optionLetter)) {
                option.classList.add('incorrect'); // Mark selected wrong answer
            }
        });

        // Show feedback message
        feedbackContainer.classList.remove('hidden');
        if (isCorrect) {
            feedbackMessage.textContent = "Richtig!";
            correctAnswers.textContent = ""; // Clear explanation area if correct
        } else {
            feedbackMessage.textContent = "Falsch!";
            // Show the correct answer text
            correctAnswers.textContent = `Die richtige Antwort ist: ${correctAnswerLetters.map(letter => `${letter}: ${currentQuestionData.answers[letter]}`).join(', ')}`;
        }

        submitBtn.classList.add('hidden'); // Hide submit button
        nextBtn.classList.remove('hidden'); // Show next button
    }


    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        scoreDisplay.textContent = `Du hast ${score} von ${totalQuestions} Fragen richtig beantwortet.`;
        const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
        percentageDisplay.textContent = `Erfolgsquote: ${percentage.toFixed(1)}%`;

        // Remove dynamic buttons before showing results
        const backButton = document.getElementById('back-button');
        if (backButton) backButton.remove();
        const homeButton = document.getElementById('home-button');
        if (homeButton) homeButton.remove();
    }


    function restartQuiz() {
        resultsScreen.classList.add('hidden');
        // Go back to category screen instead of start screen directly
        showCategoryScreen();
    }

// Hilfsfunktion zum Mischen eines Arrays (unverändert)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

});