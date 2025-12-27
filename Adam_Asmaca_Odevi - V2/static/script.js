const parts = ['head', 'body', 'armL', 'armR', 'legL', 'legR'];

// 1. EKRANI GÜNCELLEYEN ANA FONKSİYON
function updateUI(data) {
    const wordBox = document.getElementById('word-box');
    const status = document.getElementById('status');
    
    // Kelime alanını güncelle (Harflerin çakılı kalmasını sağlar)
    if (data.word_display) {
        wordBox.innerText = data.word_display.split('').join(' ');
    }

    // Adam çizimini güncelle
    const errorCount = 6 - data.attempts_left;
    parts.forEach((partId, index) => {
        const element = document.getElementById(partId);
        if (element) {
            if (index < errorCount) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible'); // Yeni oyunda temizlemek için
            }
        }
    });

    // Oyun sonu kontrolü
    if (data.game_over) {
        status.innerText = data.won ? "KAZANDIN! 🎉" : "KAYBETTİN! Kelime: " + data.correct_word;
        status.style.color = data.won ? "#4ecca3" : "#e94560";
        document.querySelectorAll('#keyboard button').forEach(b => b.disabled = true);
    }
}

// 2. TAHMİN GÖNDERME FONKSİYONU
async function guess(letter, btn) {
    if (btn) btn.disabled = true;
    
    const res = await fetch('/guess', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ letter: letter })
    });
    const data = await res.json();
    updateUI(data);
}

async function initGame() {
    // 1. Klavyeyi oluştur
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('').forEach(l => {
        const btn = document.createElement('button');
        btn.innerText = l;
        btn.classList.add('letter-btn');
        btn.onclick = () => guess(l, btn);
        keyboard.appendChild(btn);
    });

    // 2. Python'dan taptaze seçilen kelimenin çizgilerini çek
    // Burada 500 milisaniyelik çok kısa bir bekleme eklemek bazen session'ın 
    // tam oturması için iyi olur (opsiyonel ama garantidir)
    setTimeout(async () => {
        const res = await fetch('/guess', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ letter: "" })
        });
        const data = await res.json();
        updateUI(data);
    }, 100);
}
// Sayfa tamamen yüklendiğinde her şeyi başlat
window.onload = initGame;