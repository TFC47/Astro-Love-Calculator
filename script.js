document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    const yourNameInput = document.getElementById('yourName');
    const yourDobInput = document.getElementById('yourDob');
    const yourReligionInput = document.getElementById('yourReligion');

    const crushNameInput = document.getElementById('crushName');
    const crushDobInput = document.getElementById('crushDob');
    const crushReligionInput = document.getElementById('crushReligion');

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

        // Feature 2: Elemental Harmony
        let elementScore = 25;
        let elementText = `${z1.element} + ${z2.element}`;

        if (z1.element === z2.element) {
            elementScore = 38;
            elementText += " (Soul Harmony ✨)";
        } else if (
            (z1.element === "Fire" && z2.element === "Air") || (z1.element === "Air" && z2.element === "Fire") ||
            (z1.element === "Earth" && z2.element === "Water") || (z1.element === "Water" && z2.element === "Earth")
        ) {
            elementScore = 40;
            elementText += " (Power Couple 🔥)";
        } else {
            elementScore = 28;
            elementText += " (Magnetic Opposites ⚡)";
        }

        // Feature 4: Ruling Planet Synergy
        const planetText = `${z1.planet} × ${z2.planet}`;

        return {
            score: elementScore, // Out of 40
            sunSigns: `${z1.sign} & ${z2.sign}`,
            elementHarmony: elementText,
            planetSynergy: planetText
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
            j: "Makar (Capricorn)", k: "Makar (Capricorn)",
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

        // Normalize to a score between 20 and 40
        const nameScore = 20 + (charSum % 21);

        return {
            score: nameScore, // Out of 40
            rashiText: `${rashi1.split(' ')[0]} & ${rashi2.split(' ')[0]}`
        };
    }

    // ==========================================
    // FUNCTION 3: RELIGION & SPIRITUAL SYNERGY
    // ==========================================
    function calculateReligion(rel1, rel2) {
        if (rel1 === rel2) {
            return {
                score: 20, // Out of 20
                synergyText: `Shared ${rel1} Traditions (Deep Cultural Bond)`
            };
        } else {
            return {
                score: 18, // Out of 20
                synergyText: `${rel1} + ${rel2} (Interfaith Respect & Unity)`
            };
        }
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
            alert('Come on bro, fill in Name, Birth Date, and Religion for both partners!');
            return;
        }

        // Run the 3 core functions
        const astroResult = calculateBirthDate(dob1, dob2);
        const nameResult = calculateName(name1, name2);
        const religionResult = calculateReligion(rel1, rel2);

        // Combine scores (Max 100%)
        const finalPercentage = Math.min(99, astroResult.score + nameResult.score + religionResult.score);

        let loveMessage = '';
        if (finalPercentage < 50) {
            loveMessage = "Opposites attract, patience is key! 🌱";
        } else if (finalPercentage >= 50 && finalPercentage < 75) {
            loveMessage = "Strong cosmic spark & emotional warmth! 🔥";
        } else if (finalPercentage >= 75 && finalPercentage < 90) {
            loveMessage = "Written in the stars! Serious soulmate vibes. 💖";
        } else {
            loveMessage = "100% Cosmic Perfection. Wedding bells ahead! 💍✨";
        }

        // Update the Match Card UI
        document.getElementById('couple-names').textContent = `${name1} 💖 ${name2}`;
        document.getElementById('percentage').textContent = `${finalPercentage}%`;
        document.getElementById('message').textContent = loveMessage;
        document.getElementById('sun-signs').textContent = astroResult.sunSigns;
        document.getElementById('element-harmony').textContent = astroResult.elementHarmony;
        document.getElementById('planet-synergy').textContent = astroResult.planetSynergy;
        document.getElementById('naam-rashi').textContent = nameResult.rashiText;
        document.getElementById('religion-synergy').textContent = religionResult.synergyText;

        resultWrapper.style.display = 'block';
        resultWrapper.classList.remove('hidden');

        // Send all data silently to your new SheetDB
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
    });

    // ==========================================
    // FEATURE 20: DOWNLOAD MATCH CARD AS IMAGE
    // ==========================================
    downloadBtn.addEventListener('click', () => {
        downloadBtn.textContent = "Generating Image...";
        html2canvas(resultBox, { scale: 2, backgroundColor: null }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'Astro-Match-Report.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            downloadBtn.textContent = "📸 Download Match Card";
        });
    });
});