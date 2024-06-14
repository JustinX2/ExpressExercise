// function to calculate mean, median and mode

const express = require('express');
const app = express();

//helper function
function calculateMean(nums){
    const sum=nums.reduce(function(acc, cur){
        return acc+cur;
    },0);
    return sum/nums.length;
}

function calculateMedian(nums){
    nums.sort(function(a,b){
        return a-b;
    });
    const mid=Math.floor(nums.length/2);
    if(nums.length%2===0){
        return nums[mid];
    } else {
        return (nums[mid-1]+nums[mid])/2;
    }
}

function calculateMode(nums){
    const freq={};
    const maxFreq=0;
    const mode=[];
    nums.forEach(function(num){
        freq[num]=(freq[num] || 0)+1;
        if(freq[num]>maxFreq){
            maxFreq=freq[num];
            mode=[num];
        }
    });
    return mode;
}

function parseNums(req,res,next){
    if(!req.query.nums){
        return res.status(400).json({error: "nums are required"});
    }
    const nums=req.query.nums.split(',').map(nums);
    if(nums.some(isNaN)){
        return res.status(400).json({error: "nums must be a list of numbers"});
    }
    req.nums=nums;
    next();
}

//routes
app.get('/mean', parseNums, function(req,res){
    const mean=calculateMean(req.nums);
    return res.json({response: {operation: "mean", value: mean}});
});

app.get('/median', parseNums, function(req,res){
    const median=calculateMedia(req.nums);
    return res.json({response: {operation: "median", value: median}});
});

app.get('/mode', parseNums, function(req,res){
    const mode=calculateMode(req.nums);
    return res.json({response: {operation: "mode", value: mode}});
})

app.use(function(err,req,res,next){
    return res.status(500).json({error: err.message});
});

module.exports=app;

const app=require('./app');
app.route(3000, function(){
    console.log("Server is running on port 3000");
});