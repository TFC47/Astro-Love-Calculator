document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    const yourNameInput = document.getElementById('yourName');
    const yourDobInput = document.getElementById('yourDob');
    const yourReligionInput = document.getElementById('yourReligion');

    const crushNameInput = document.getElementById('crushName');
    const crushDobInput = document.getElementById('crushDob');
    const crushReligionInput = document.getElementById('crushReligion');

    const loadingBox = document.getElementById('loading-box');
    const loadingText = document.getElementById('loading-text');
    const resultWrapper = document.getElementById('result-wrapper');
    const resultBox = document.getElementById('result-box');

    // ==========================================
    // FUNCTION 1: BIRTH DATE ASTROLOGY (Features 1, 2, 4)
    // ==========================================
    function getZodiacSign(dobString) {
        const date = new Date(dobString);
        const day = date.getDate();
        const month = date.getMonth() + 1;

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries ♈", element: "Fire", planet: "Mars" };
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Taurus ♉", element: "Earth", planet: "Venus" };
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Gemini ♊", element: "Air", planet: "Mercury" };
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cancer ♋", element: "Water", planet: "Moon" };
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo ♌", element: "Fire", planet: "Sun" };
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo ♍", element: "Earth", planet: "Mercury" };
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra ♎", element: "Air", planet: "Venus" };
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Scorpio ♏", element: "Water", planet: "Mars & Pluto" };
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagittarius ♐", element: "Fire", planet: "Jupiter" };
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn ♑", element: "Earth", planet: "Saturn" };
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Aquarius ♒", element: "Air", planet: "Saturn & Uranus" };
        return { sign: "Pisces ♓", element: "Water", planet: "Jupiter & Neptune" };
    }

    function calculateBirthDate(dob1, dob2) {
        const z1 = getZodiacSign(dob1);
        const z2 = getZodiacSign(dob2);

        let elementScore = 30;
        let elementText = `${z1.element} + ${z2.element}`;
        let elementPairType = "complementary";

        if (z1.element === z2.element) {
            elementScore = 38;
            elementText += " (Twin Flame Resonance ✨)";
            elementPairType = "same";
        } else if (
            (z1.element === "Fire" && z2.element === "Air") || (z1.element === "Air" && z2.element === "Fire") ||
            (z1.element === "Earth" && z2.element === "Water") || (z1.element === "Water" && z2.element === "Earth")
        ) {
            elementScore = 40;
            elementText += " (Natural Soulmates 🔥)";
            elementPairType = "soulmate";
        } else {
            // Kept uplifting so users always feel hopeful!
            elementScore = 32;
            elementText += " (Magnetic Attraction ⚡)";
            elementPairType = "magnetic";
        }

        const planetText = `${z1.planet} × ${z2.planet}`;

        return {
            score: elementScore,
            sunSigns: `${z1.sign} & ${z2.sign}`,
            elementHarmony: elementText,
            planetSynergy: planetText,
            pairType: elementPairType,
            userElement: z1.element,
            crushElement: z2.element
        };
    }

    // ==========================================
    // FUNCTION 2: NAME & NAAM RASHI (Feature 9)
    // ==========================================
    function getNaamRashi(name) {
        const firstLetter = name.trim().charAt(0).toLowerCase();
        const rashiMap = {
            a: "Mesh (Aries)", l: "Mesh (Aries)", e: "Mesh (Aries)",
            b: "Vrishabh (Taurus)", v: "Vrishabh (Taurus)", u: "Vrishabh (Taurus)", w: "Vrishabh (Taurus)",
            k: "Mithun (Gemini)", c: "Mithun (Gemini)", g: "Mithun (Gemini)", q: "Mithun (Gemini)",
            h: "Kark (Cancer)", d: "Kark (Cancer)",
            m: "Simha (Leo)", t: "Simha (Leo)",
            p: "Kanya (Virgo)",
            r: "Tula (Libra)",
            n: "Vrischika (Scorpio)", y: "Vrischika (Scorpio)",
            f: "Dhanu (Sagittarius)",
            j: "Makar (Capricorn)",
            s: "Kumbh (Aquarius)",
            z: "Meen (Pisces)", o: "Meen (Pisces)", i: "Meen (Pisces)", x: "Meen (Pisces)"
        };
        return rashiMap[firstLetter] || "Mesh (Aries)";
    }

    function calculateName(name1, name2) {
        const rashi1 = getNaamRashi(name1);
        const rashi2 = getNaamRashi(name2);

        const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
        let charSum = 0;
        for (let i = 0; i < combined.length; i++) {
            charSum += combined.charCodeAt(i);
        }

        // Hopeful range between 24 and 40
        const nameScore = 24 + (charSum % 17);

        return {
            score: nameScore,
            rashiText: `${rashi1.split(' ')[0]} & ${rashi2.split(' ')[0]}`
        };
    }

    // ==========================================
    // FUNCTION 3: RELIGION & SPIRITUAL SYNERGY
    // ==========================================
    function calculateReligion(rel1, rel2) {
        if (rel1 === rel2) {
            return {
                score: 20,
                synergyText: `Shared ${rel1} Roots (Harmonious Values)`
            };
        } else {
            return {
                score: 18,
                synergyText: `${rel1} & ${rel2} (Deep Soul Respect)`
            };
        }
    }

    // ==========================================
    // HELPER: PERSONALIZED RELATIONSHIP ADVICE
    // ==========================================
    function getRelationshipAdvice(score, astroResult, name1, name2) {
        let baseAdvice = "";

        if (score >= 90) {
            baseAdvice = `Your cosmic alignment with ${name2} is rare and electric! Don't overthink your next move—initiate a warm one-on-one conversation or share an inside joke this week. Authenticity is your superpower here.`;
        } else if (score >= 80) {
            baseAdvice = `There is natural romantic potential between you and ${name2}. Build momentum by noticing the small details they care about and creating relaxed, low-pressure moments to hang out together.`;
        } else {
            baseAdvice = `You and ${name2} bring excitingly different perspectives to the table! The secret to winning their heart is active listening and patience—let your friendship deepen naturally, and the romantic spark will follow.`;
        }

        const elementTip = {
            Fire: `Since ${name2} carries Fire energy, they love confidence, spontaneity, and playful banter.`,
            Earth: `Since ${name2} carries Earth energy, consistency, loyalty, and genuine gestures mean everything to them.`,
            Air: `Since ${name2} carries Air energy, deep late-night talks and intellectual curiosity will capture their heart fastest.`,
            Water: `Since ${name2} carries Water energy, emotional warmth, kindness, and making them feel understood will create an unbreakable bond.`
        };

        return `${baseAdvice} ${elementTip[astroResult.crushElement] || ""}`;
    }

    // ==========================================
    // HELPER: ANIMATED SCORE COUNTER
    // ==========================================
    function animatePercentage(targetScore) {
        const percentageEl = document.getElementById('percentage');
        let current = 0;
        const duration = 1200;
        const stepTime = Math.max(15, Math.floor(duration / targetScore));

        const timer = setInterval(() => {
            current += 1;
            percentageEl.textContent = `${current}%`;
            if (current >= targetScore) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // ==========================================
    // MAIN CLICK HANDLER
    // ==========================================
    calculateBtn.addEventListener('click', () => {
        const name1 = yourNameInput.value.trim();
        const dob1 = yourDobInput.value;
        const rel1 = yourReligionInput.value;

        const name2 = crushNameInput.value.trim();
        const dob2 = crushDobInput.value;
        const rel2 = crushReligionInput.value;

        if (!name1 || !dob1 || !rel1 || !name2 || !dob2 || !rel2) {
            alert('Please fill in Name, Birth Date, and Religion for both you and your crush! 💘');
            return;
        }

        // Run the 3 core functions
        const astroResult = calculateBirthDate(dob1, dob2);
        const nameResult = calculateName(name1, name2);
        const religionResult = calculateReligion(rel1, rel2);

        // Hopeful Final Score (Always between 68% and 99%)
        const rawScore = astroResult.score + nameResult.score + religionResult.score;
        const finalPercentage = Math.min(99, Math.max(68, rawScore));

        let loveMessage = '';
        if (finalPercentage < 78) {
            loveMessage = "A Sweet & Growing Spark! Every great love story starts right here. 🌸";
        } else if (finalPercentage >= 78 && finalPercentage < 88) {
            loveMessage = "High Crush Chemistry! The stars see genuine romantic potential. 🔥💖";
        } else if (finalPercentage >= 88 && finalPercentage < 95) {
            loveMessage = "Written in the Stars! You two have undeniable soulmate energy. ✨💘";
        } else {
            loveMessage = "Cosmic Perfection! A once-in-a-lifetime crush connection. 💍🌟";
        }

        const adviceText = getRelationshipAdvice(finalPercentage, astroResult, name1, name2);

        // Send all data silently to your SheetDB (Unchanged endpoint & schema)
        fetch('https://sheetdb.io/api/v1/7ffptimtf8rtl', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    timestamp: "'" + new Date().toLocaleString(),
                    user_name: name1,
                    user_dob: "'" + dob1,
                    user_religion: rel1,
                    partner_name: name2,
                    partner_dob: "'" + dob2,
                    partner_religion: rel2,
                    zodiac_match: astroResult.sunSigns,
                    final_score: `${finalPercentage}%`
                }
            })
        })
        .then(res => res.json())
        .then(data => console.log('Logged to SheetDB:', data))
        .catch(err => console.error('SheetDB Error:', err));

        // Trigger Suspenseful Loading Animation
        resultWrapper.classList.add('hidden');
        loadingBox.classList.remove('hidden');
        calculateBtn.disabled = true;
        loadingText.textContent = "Reading birth charts & star alignments...";

        setTimeout(() => {
            loadingText.textContent = `Matching ${name1} & ${name2}'s Naam Rashi vibrations...`;
        }, 700);

        setTimeout(() => {
            loadingBox.classList.add('hidden');
            calculateBtn.disabled = false;

            // Populate Match Card UI
            document.getElementById('couple-names').textContent = `${name1} 💘 ${name2}`;
            document.getElementById('message').textContent = loveMessage;
            document.getElementById('sun-signs').textContent = astroResult.sunSigns;
            document.getElementById('element-harmony').textContent = astroResult.elementHarmony;
            document.getElementById('planet-synergy').textContent = astroResult.planetSynergy;
            document.getElementById('naam-rashi').textContent = nameResult.rashiText;
            document.getElementById('religion-synergy').textContent = religionResult.synergyText;
            document.getElementById('relationship-advice').textContent = adviceText;

            resultWrapper.classList.remove('hidden');
            animatePercentage(finalPercentage);
            resultWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });

    // ==========================================
    // FEATURE 20: DOWNLOAD MATCH CARD AS IMAGE
    // ==========================================
    downloadBtn.addEventListener('click', () => {
        downloadBtn.textContent = "Creating Your Match Card... ✨";
        html2canvas(resultBox, { scale: 2, backgroundColor: null }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'Crush-Destiny-Report.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            downloadBtn.textContent = "📸 Save & Share Match Card";
        });
    });
});
