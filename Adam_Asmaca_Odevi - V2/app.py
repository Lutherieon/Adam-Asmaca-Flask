from flask import Flask, render_template, jsonify, request, session
import random

app = Flask(__name__)
app.secret_key = 'adam_asmaca_gizli_anahtar' # Session için zorunlu

WORDS = ["PYTHON", "YAZILIM", "FLASK", "GELISTIRICI"]

@app.route('/')
def index():
    # Sayfaya her girildiğinde veya F5 yapıldığında 
    # eski oturum verilerini TAMAMEN siliyoruz.
    session.clear() 
    
    # Şimdi taptaze bir kelime seçiyoruz
    session['word'] = random.choice(WORDS).upper()
    session['guessed'] = []
    session['attempts'] = 6
    
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    data = request.json
    letter = data.get('letter', '').upper()
    
    # 1. GÜVENLİK: Session verisi kaybolmuşsa geri getir
    if 'guessed' not in session:
        session['guessed'] = []
    if 'attempts' not in session:
        session['attempts'] = 6

    # 2. MANTIK: Eğer harf yeni bir harfse listeye ekle
    # 'session['guessed']' listesini geçici bir değişkene alıp güncellemeliyiz
    current_guessed = session['guessed']
    
    if letter and letter not in current_guessed:
        current_guessed.append(letter)
        session['guessed'] = current_guessed # Session'ı güncelle
        
        if letter not in session['word']:
            session['attempts'] -= 1

    # 3. GÖRÜNÜM: Kelimeyi O ANKİ TÜM TAHMİNLERE göre oluştur
    # Bu döngü, bulunan tüm harfleri 'çakılı' tutar.
    word_display = "".join([l if l in session['guessed'] else "_" for l in session['word']])
    
    won = all(l in session['guessed'] for l in session['word'])
    
    return jsonify({
        'word_display': word_display, 
        'attempts_left': session['attempts'],
        'won': won,
        'game_over': session['attempts'] <= 0 or won,
        'correct_word': session['word'] if session['attempts'] <= 0 else ""
    })

if __name__ == '__main__':
    app.run(debug=True)