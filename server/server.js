const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

const trustRoutes=require('./routes/trustRoutes');
app.use('/api',trustRoutes);

app.get('/',(req,res)=>{
    res.send('Gujarat Kalyan Parishad API running!');
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.error(err));

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
