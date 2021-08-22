import colors from 'colors'
import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Lilpo123:Lilpo123@cluster0.lytdi.mongodb.net/proshop?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useCreateIndex:true,
        })
        console.log(`MONGO Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}
export default connectDB