window.onload = () => {
  
  // jumlah nyawa
  const limit = 3;
  let heart = limit;
  
  const input = document.querySelector('.input');
  const boxes = document.querySelectorAll('.box');
  
  function guessColor() {
    // dapatkan kode warna hexadecimal secara acak 
    const color = hexColorGenerator();
    // masukkan isi variabel color kedalam input
    input.value = color;
    // ubah semua warna box secara acak
    setAllBox();
    /*
      ubah warna box tertentu dengan isi dari variabel
      color. jika nantinya isi data-value dari box yang ditekan
      pemain sama dengan isi dari variabel color. berarti itu jawaban benarnya!
    */
    setBox(color);
    // kembalikan nilai berupa kode warna
    return color;
  }
  
  let result = guessColor();
  
  function hexColorGenerator() {
    // string acak 
    const str = '0123456789abcdef';
    let result = '#';
    // looping sebanyak 6 kali 
    for (let i = 0; i < 6; i++) {
      // masukkan hasil loopingan kedalam variabel result
      result += str[Math.floor(Math.random() * str.length)];
    }
    // mengembalikan nilai berupa kode warna yang sudah digenerate menjadi huruf besar semua
    return result.toUpperCase();
  }
  
  function setAllBox() {
    // looping
    boxes.forEach(box => {
      // dapatkan warna hexadecimal secara acak
      const color = hexColorGenerator();
      // set warna ke semua box
      box.style.background = color;
      /*
        buat atribut baru dengan nama data-value yang 
        berisikan kode warna dari variabel color
      */
      box.setAttribute('data-value', color);
    });
  }
  
  function setBox(color) {
    // pilih box tertentu
    const box = boxes[Math.floor(Math.random() * boxes.length)];
    // ubah warna box yang didapat dengan isi variabel color
    box.style.background = color;
    /*
      timpa atribut data-value yang dulu, dengan atribut data-value yang baru
      yang berisikan kode warna dari parameter color
    */
    box.setAttribute('data-value', color);
  }
  
  boxes.forEach(box => {
    // ketika box ditekan
    box.addEventListener('click', function() {
      // ambil isi dari data-value box
      const value = this.dataset.value;
      // bandingkan jawaban pemain dengan jawaban aslinya
      const check = setGames(value, result);
      /*
        jika variabel check mengembalikan nilai berupa boolean 
        true, maka tampilkan sisa nyawa pemain
      */
      if (check == true) alert(`your heart : ${heart} times again!`);
      /*
        jika nyawa pemain sudah tersisa 0, maka tampilkan pesan
        bahwa dia kalah. lalu tanyakan, apakah dia masih mau main lagi?
      */
      if (heart == 0) {
        // pesan 
        alert('You Lose! you can try again if you want');
        // tanyakan
        again();
      }
    });
  });
  
  function setGames(value, result) {
    // jika jawaban pemain sama dengan jawaban aslinya (benar)
    if (value == result) {
      // tampilkan pesan
      alert('Congratulation! you are the winner!');
      // apakah pemain mau main lagi?
      again();
    } else {
      // jika jawaban pemain tidak sama dengan jawaban aslinya (salah)
      alert('Wrong Color! please try again!');
      // kurangi jumlah nyawa pemain
      heart--;
      // kembalikan nilai berupa boolean true supaya bisa menampilkan sisa nyawa pemain
      return true;
    }
  }
  
  function again() {
    const ask = confirm('do you want to play again?');
    // jika pemain menekan tombol ok atau yes
    if (ask == true) {
      // tampilkan pesan
      alert(`let's play again!`);
      // reset nyawa pemain seperti semula, yaitu 3
      heart = limit;
      // jalankan lagi fungsi guessColor()
      result = guessColor();
    } else {
      // jika pemain menekan tombol no atau cancel
      alert('thanks for playing with us!');
      // matikan semua box
      boxes.forEach(box => box.setAttribute('disabled', true));
    }
  }
  
}