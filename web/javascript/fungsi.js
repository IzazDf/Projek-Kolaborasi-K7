function konversi () {
    //const satuan = ["Tera ohm", "Giga ohm", "Mega ohm", "Kilo ohm", "Ohm", "Mili ohm", "Mikro ohm", "Nano ohm", "Pico ohm"];
    const st = ["TΩ", "GΩ", "MΩ", "kΩ", "Ω", "mΩ", "μΩ", "nΩ", "pΩ"];

    let awal = parseInt(document.getElementById("awal").value);
    let akhir = parseInt(document.getElementById("akhir").value);
    let input = parseFloat(document.getElementById("angka").value);

    //memastikan hanya angka dan koma titik saja yang ditampilkan
    const inputElement = document.getElementById("angka");

    inputElement.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9.,]/g, '');
      
      const splitValue = this.value.split(/[.,]/);
      if (splitValue.length > 2) {
        this.value = splitValue[0] + (this.value.includes('.') ? '.' : ',') + splitValue[1];
      }
    });
    
    let hasil;
    let hasilohm = input;

    //Fungsi konversi
    if (awal < 5) {
        let z = 5 - awal;
        hasilohm *= Math.pow(1000, z);
    } else if (awal > 5) {
        let z = awal - 5;
        hasilohm /= Math.pow(1000, z); 
    }

    if (akhir < 5) {
        let z = 5 - akhir;
        hasil = hasilohm / Math.pow(1000, z);
    } else if (akhir > 5) {
        let z = akhir - 5;
        hasil = hasilohm * Math.pow(1000, z);
    } else {
        hasil = hasilohm;
    }

    let dflt = hasil / input;
    let mega = hasilohm / Math.pow(1000, 2);
    let mikro = hasilohm * Math.pow(1000, 2);

    console.log('ohm:', hasilohm);
    console.log('mega awal:', mega); //debug nilai mega awal

    //Fungsi agar dapat menggunakan koma (,) sebagai titik
    function ubahtitik () {
        inputField.value = inputField.value.replace(",", ".")   
    }

    let inputField = document.getElementById("angka");

    inputField.addEventListener("input", function () {
        ubahtitik(inputField);
    });

    //fungsi untuk mengubah bentuk input ke eksponen 
    if (Math.abs(input) >= 10000 || Math.abs(input) <= 0.0001) {
        input = input.toExponential()
    } else {
        input = input.toString()
    }

    //fungsi untuk mengubah bentuk output hasil ke eksponen
    if (Math.abs(mega) >= 10000 || Math.abs(mega) <= 0.0001 || Math.abs(mikro) >= 10000 || Math.abs(mikro) <= 0.0001 || Math.abs(hasilohm) >= 10000 || Math.abs(hasilohm) <= 0.0001) {
        mikro = mikro.toExponential()
        mega = mega.toExponential()
        hasilohm = hasilohm.toExponential()

        console.log('megamega:', mega);
        
    } else {
        mega = mega.toString()
        mikro = mikro.toString()
        hasilohm = hasilohm.toString()
    }

    //console.log('mega:', mega); //debug

    if (Math.abs(hasil) >= 10000 || Math.abs(hasil) <= 0.0001 || Math.abs(dflt) >= 10000 || Math.abs(dflt) <= 0.0001) {
        hasil = hasil.toExponential();
        dflt = dflt.toExponential();
    } else {
        hasil = hasil.toString();
        dflt = dflt.toString();
    }

    //console.log('ohmpangkat:', hasilohm); //debug hasilohm pangkat

    //fungsi untuk menampilakn pangkat
    function format(output) {
        const upscript = ["⁰","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"];

        console.log('output:', output); //debug output

        let nilai_pangkat, eks, nilai1, pangkat, nilaiwithpangkat, hasilhasil;
        if (output.includes('e')) {
            nilai_pangkat = output.split('e');
            eks = output.split('e');
            nilai1 = eks[0];
            pangkat = eks[1];

            //console.log('nilai:', nilai1); //debug nilai
            //console.log('pangkat:', pangkat); //debug eksponen
    
            nilaiwithpangkat = pangkat.split('').map(char => (char === '-' ? '⁻' : upscript[parseInt(char)])).join('');
            return `${nilai1}×10${nilaiwithpangkat}`;
    
        } else {
            return output.toString();
        }
    }

    //menjalankan fungsi format
    //supaya hasil tidak 10⁰
    if (hasilohm.includes('e+0')) {
        hasilohm;
    } else {
        hasilohm = format(hasilohm);
    }

    if (mega.includes('e+0')) {
        mega;
    } else {
        mega = format(mega);
    }

    if (mikro.includes('e+0')) {
        mikro;
    } else {
        mikro = format(mikro);
    }

    input = format(input);
    hasil = format(hasil);
    dflt = format(dflt);

    if (hasilohm.includes('e+0')) {
        hasilohm = 1;

    } else {
        hasilohm;
    }

    if (mega.includes('e+0')) {
        mega = 1;

    } else {
        mega;
    }

    if (mikro.includes('e+0')) {
        mikro = 1;

    } else {
        mikro;
    }

    //Output hasil
    document.getElementById("dflt").textContent = `1 ${st[awal-1]} = ${dflt}  ${st[akhir-1]}`;
    document.getElementById("dipilih").textContent = `${hasil}`;
    document.getElementById("mega").textContent = `${input} ${st[awal-1]} = ${mega} ${st[2]}`;
    document.getElementById("ohm").textContent = `${input} ${st[awal-1]} = ${hasilohm} ${st[4]}`;
    document.getElementById("mikro").textContent = `${input} ${st[awal-1]} = ${mikro} ${st[6]}`;

}
konversi ();