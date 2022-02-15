import { query, where, limit, getDocs, Timestamp } from 'firebase/firestore';

export const getDailyChord = async (date, dbRef) => {
    const isDailyChord = query(dbRef, where('dates', 'array-contains', Timestamp.fromMillis(date)));
    const dailyChordSnapshot = await getDocs(isDailyChord);
    return dailyChordSnapshot.docs[0];
}

export const getRandomChordFromId = async (id, dbRef) => {
    const [queryComparator, queryComparatorBackup] = Math.random() < 0.5 ? ['>=','<='] : ['<=','>='];

    const initialQuery = query(dbRef, where('randomId', queryComparator, id), limit(1));
    const backupQuery = query(dbRef, where('randomId', queryComparatorBackup, id), limit(1));

    let randomChordSnapshot = await getDocs(initialQuery);
    if (randomChordSnapshot.empty) {
        randomChordSnapshot = await getDocs(backupQuery);
    }
    return randomChordSnapshot.docs[0];
}
