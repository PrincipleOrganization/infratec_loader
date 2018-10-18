var result = {
    localdate:new Date()
};

var sdata = msg.payload;
var arr_sdata = sdata.split('\n');

result.length = arr_sdata.length;

//Ambient Temperature
var ambietTemperature = arr_sdata[5];
var arr_ambietTemperature = ambietTemperature.split(":");
result.ambietTemperature = arr_ambietTemperature[1];

//Analysis Counter
var analysisCounter = arr_sdata[6];
var arr_analysisCounter = analysisCounter.split(":");
result.analysisCounter = arr_analysisCounter[1];

//Sub sample
var subSample = arr_sdata[9];
var arr_subSample = subSample.split(":");
var arr_subSample_1 = arr_subSample[0].split("     ");

result.subsample = {
   id : arr_subSample[0].replace("NrOFSubSamples",""),
   NrOFSubSamples : arr_subSample[1]
}

//Sample hash
var sampleHash = arr_sdata[11];
result.sampleHash = sampleHash;

//read quailities 
var startQ  = 12;
var qLength = 7;
var endStr  = "#";

var qualities = [];

for( var i = startQ; i <= arr_sdata.length-qLength; ){
    
    
    var q = {
        id:arr_sdata[i],
        value:arr_sdata[i+1].split(/^s[-0-9a-zA-Z.]/)[0],
        minmax:arr_sdata[i+4].split(/^s[-0-9a-zA-Z.]/)[0]
    }
    
    qualities.push(q);   
    i = i+qLength;
    // break;
}

result.qualities = qualities;

// msg.payload = arr_sdata;
msg.payload = result;


return msg;
