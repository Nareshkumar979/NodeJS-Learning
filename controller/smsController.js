const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '178a44d5',
  apiSecret: 'X85ZHQNgHk4t2WKi',
});




exports.send_sms = function(req, res){
    if(JSON.stringify(req.body)=='{}')
	{
		return res.send({ status: true, data: [], message: 'No Data Available' });
    }
    else
    {
        const from = 'Nexmo';
        const to = req.body.toPhone;
        const text = req.body.smsmessage;
        if(to=='' || text=='')
        {
            return res.send({status: true, data: [], message: 'To Number or Message is Empty'})
        }
        //return res.send({from,to,text});
        nexmo.message.sendSms(
        from, to, text, {type: 'unicode'},
            (err, response)=>{
                if(err)
                {
                    console.log('The Error is : '+ err);
                }
                else
                {
                    res.send({response});
                }
            }
        );

    }
    
}