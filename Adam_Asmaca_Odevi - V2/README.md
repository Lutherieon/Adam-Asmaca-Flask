📝 Ödev Raporu: Görsel Destekli Adam Asmaca Projesi
1. Proje Özeti
Bu proje, Python'ın Flask kütüphanesi ve modern web teknolojileri kullanılarak geliştirilmiş, etkileşimli bir "Adam Asmaca" oyunudur. Projenin en temel özelliği, backend (Python) ve frontend (JS) arasındaki veri akışının kesintisiz sağlanması ve hatalı tahminlerin SVG üzerinden anlık olarak görselleştirilmesidir.

2. Kullanılan Teknolojiler
Backend: Python 3.x ve Flask Framework.

Frontend: HTML5, CSS3, JavaScript (Fetch API).

AI Desteği: Proje geliştirme sürecinin tamamında Google Gemini "Yapay Zekâ Thought Partner" olarak kullanılmıştır.

3. Geliştirme Pipeline'ı (Süreç)
Ortam Kurulumu: venv kullanılarak izole bir geliştirme ortamı oluşturulmuş ve gerekli bağımlılıklar (Flask) yüklenmiştir.

Backend Tasarımı: Gemini ile birlikte oyun mantığı, rastgele kelime seçimi ve session (oturum) yönetimi kurgulanmıştır.

Frontend Entegrasyonu: Kullanıcı arayüzü tasarlanmış, harf butonları ve görsel çizim alanı (SVG) oluşturulmuştur.

İnce Ayar ve Debug: Karşılaşılan teknik aksaklıklar Gemini ile yapılan interaktif diyaloglar sayesinde çözüme kavuşturulmuştur.

4. Karşılaşılan Zorluklar ve Gemini ile Üretilen Çözümler
Proje sürecinde karşılaşılan ve Gemini rehberliğinde çözülen kritik teknik problemler:

Veri Kalıcılığı Sorunu: Tahmin edilen harflerin her yeni istekte sıfırlanması sorunu yaşanmıştır. Gemini'nin yönlendirmesiyle Flask session yapısı revize edilmiş ve "list append" mantığıyla tüm tahminlerin oturum boyunca saklanması sağlanmıştır.

Görsel Senkronizasyon: Doğru tahminlerin ekranda sabit kalmaması ve karakterlerin kayması sorunu, CSS'te "Fixed-width" font kullanımı ve JS'de innerText temizleme mantığı uygulanarak çözülmüştür.

Başlangıç Durumu: Sayfa ilk yüklendiğinde oyunun başlamaması sorunu, window.onload tetikleyicisi eklenerek giderilmiştir.

5. Sonuç ve Kazanımlar
Bu proje sayesinde bir web uygulamasının uçtan uca (end-to-end) nasıl inşa edildiği deneyimlenmiştir. Özellikle Google Gemini gibi gelişmiş bir dil modelini "Pair Programmer" olarak kullanmak; hata ayıklama hızını artırmış ve dokümantasyon kültürünün önemini kavramamı sağlamıştır.