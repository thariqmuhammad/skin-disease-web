$(document).ready(function(){
    // eksim hover
    $('.b1').hover(function(){
        $('.b1').css('width','300px'); $('.b1').css('padding','2px');
        $('.b1').html("Eksim adalah istilah terkait gangguan pembengkakan pada kulit. Gangguan ini disebut juga dengan dermatitis. Saat terjadi, reaksi alergi pada kulit dapat ditandai dengan timbulnya warna kemerahan, ruam, dan rasa gatal. Kondisi ini dapat menimbulkan rasa tidak nyaman serta mengganggu penampilan.");
    },function(){
        $('.b1').last().html("Eksim");
    })
    // Herpes hover
    $('.b2').hover(function(){
        $('.b2').css('width','300px'); $('.b2').css('padding','2px');
        $('.b2').html("Herpes adalah kelompok virus yang dapat menyebabkan infeksi. Infeksi virus herpes umumnya ditandai dengan kulit kering, luka lepuh, atau luka terbuka yang berair");
    },function(){
        $('.b2').last().html("Herpes");
    })
    // Jerawat hover
    $('.b3').hover(function(){
        $('.b3').css('width','300px'); $('.b3').css('padding','2px');
        $('.b3').html("Jerawat adalah kondisi ini berhubungan dengan produksi minyak (sebum) yang terjadi secara berlebihan. Hal tersebut menyebabkan peradangan serta penyumbatan pada pori-pori kulit. Peradangan ini ditandai dengan munculnya benjolan kecil yang terkadang berisi nanah di atas kulit.  Benjolan inilah yang disebut dengan jerawat. ");
    },function(){
        $('.b3').last().html("Jerawat");
    })
    // Kudis hover
    $('.b4').hover(function(){
        $('.b4').css('width','300px'); $('.b4').css('padding','2px');
        $('.b4').html("Kudis adalah kondisi yang ditandai dengan gatal di kulit, terutama di malam hari. Gatal ini disertai dengan kemunculan ruam berbintik yang menyerupai jerawat atau lepuhan kecil bersisik. Kondisi ini terjadi akibat tungau yang hidup dan bersarang di kulit.");
    },function(){
        $('.b4').last().html("Kudis");
    })
    // Rosacea hover
    $('.b5').hover(function(){
        $('.b5').css('width','300px'); $('.b5').css('padding','2px');
        $('.b5').html("Rosacea adalah penyakit yang menyebabkan kulit pada bagian hidung, pipi, dagu, dan dahi menjadi kemerahan. Rosacea mungkin juga dapat menimbulkan benjolan kecil, merah, dan berisi nanah. Rosacea juga sering disalahartikan sebagai jerawat atau masalah kulit lainnya.");
    },function(){
        $('.b5').last().html("Rosacea");
    })
    

    $(".record").click(function(){
        $(".record").html('<a href="">Tutup Kamera<a>')
        $(".webcamku").html('<div style="text-align: center;"><video id="preview" style="border-radius: 30px;"></video><span style="position:relative;left:-270px;top:60px"><button class="btn btn-warning" id="capture" style="border-radius:50%;width:100px;height:100px;position:relative;top:-60px"><img src="../static/gambar/camera.svg" width="50"></button></span></div>')
    
        // const preview = $('#preview')
    
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 450,
                height: 450
            }
        })
        .then(stream => {
            preview.srcObject = stream;
            preview.play();
        })
        .catch(error => {
            console.error(error)
        })


        // jika tombol capture di click
        $('#capture').click(function(){
            const result = $('#result');
            const context = output.getContext('2d');

            output.width = 400,
            output.height = 400

            context.drawImage(preview, 0, 0, output.width, output.height);
            result.src = output.toDataURL();
            const url = output.toDataURL();
            console.log(url);
            // ubah tombol
            $(".record").html('<a href="">Ambil Ulang<a>')
             // ganti element webcamku menjadi foto hasil capture
                $(".webcamku").html('<div style="text-align: center;"><img src="'+url+'" ></div>')
                // jika tombol mulai predic di tekan maka kirim urul image
                $("#dataGambar").val(''+url+'')
            })
        
    })

    // script untu prev image hasl upload
    $('input[type=file').on('change', function(e){
        var reader = new FileReader();
        reader.onload = function(e){
            $('#preview_img').attr('src', e.target.result)
            $("#dataGambar").val(''+e.target.result+'')
        }
        reader.readAsDataURL(this.files[0]);
    })

    // ============= Proses Redirect Halaman setelah proses =============

    
    // ============= end Proses Redirect Halaman setelah proses =============
    
})

