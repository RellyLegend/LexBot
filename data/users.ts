import { User } from "./models/User";

export async function getUserData(id: string) {
    return await User.findOne({ userId: id  }) || await new User({ userId: id }).save();
}

export async function addCoins(id: string, coins: number, to: string) {
    if (to === "wallet") {
        return await User.findOneAndUpdate({ userId: id }, {
            $inc: {
                wallet: coins,
            }
        });
    } else if (to === "bank") {
        return await User.findOneAndUpdate({ userId: id }, {
            $inc: {
                bank: coins,
            }
        });
    }
}

export async function depositCoins(id: string, amount: number) {
    return await User.findOneAndUpdate({ userId: id }, {
        $inc: {
            wallet: -amount,
            bank: amount,
        }
    });
}

export async function withdrawCoins(id: string, amount: number) {
    return await User.findOneAndUpdate({ userId: id }, {
        $inc: {
            wallet: amount,
            bank: -amount,
        }
    });
}

export async function daily(id: string, amount: number) {
    return await User.findOneAndUpdate({ userId: id }, {
        $inc: {
            daily: Date.now(),
            wallet: amount,
        }
    });
}

export async function getTotalUsers() {
    return await User.find({ });
}