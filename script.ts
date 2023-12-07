import { db } from './db'

const dataSelect = db.data.createSelect({
    id: true,
    data: true
});

async function main() {
    const one = await db.wrapper.create({
        data: {
            data: {
                create: {
                    //
                }
            }
        },
        select: {
            id: true,
            data: {
                select: dataSelect
            }
        }
    });
    console.dir(one)
}

main();
