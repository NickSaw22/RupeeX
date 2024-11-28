import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async(req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    //Update balance and add txn
    console.log(paymentInformation);
    try{
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token: paymentInformation.token
                },
                data:{
                    status: "Success"
                }
            })
        ])
        
        res.json({
            message: "Captured"
        })
    }
    catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })   
    }
})

app.post("/MerchantBankWebhook", async(req, res) => {
    const paymentInformation: {
        token: string;
        merchantId: string;
        amount: string
    } = {
        token: req.body.token,
        merchantId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    //Update merchant balance and add txn
    console.log(paymentInformation);
    try{
        await db.$transaction([
            db.merchantBalance.updateMany({
                where:{
                    merchantId: Number(paymentInformation.merchantId)
                },
                data:{
                    amount:{
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token: paymentInformation.token
                },
                data:{
                    status: "Success"
                }
            })
        ])
        
        res.json({
            message: "Captured"
        })
    }
    catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })   
    }
})
app.listen(3003);