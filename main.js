//https://teachablemachine.withgoogle.com/models/qh36cod4T/model.json
Prediction_1="";
Prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+ data_uri + '"/>'
    });
}

console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qh36cod4T/model.json',modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded');
}

function Speak()
{
    var synth=window.speechSynthesis;
    Speak_data_1="The first prediction is" + Prediction_1;
    Speak_data_2="The second prediction is" + Prediction_2;
    var utterthis=new SpeechSynthesisUtterance(Speak_data_1+Speak_data_2);
    synth.speak(utterthis);
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,got_result);
}

function got_result(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else 
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        Speak();
        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996";
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML="&#128076";
        }
        if(results[1].label == "Best")
        {
            document.getElementById("update_emoji_2").innerHTML="&#128077";
        }
        if(results[1].label == "Victory")
        {
            document.getElementById("update_emoji_2").innerHTML="&#9996";
        }
        if(results[1].label == "Amazing")
        {
            document.getElementById("update_emoji_2").innerHTML="&#128076";
        }
    }
}