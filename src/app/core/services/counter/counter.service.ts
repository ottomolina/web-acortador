import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { addDoc, arrayUnion, collection, doc, query, QueryConstraint, updateDoc, where } from "firebase/firestore";
import { COUNTER } from "../../constants/counter.constants";
import { CounterLink } from "../../interfaces/counter-link.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    constructor(
        private fire: Firestore,
    ){}

    public createCounter(linkId: string) {
        const counter: CounterLink = { linkId, datetime: [] }
        const counterRef = collection(this.fire, COUNTER.COLLECTION);
        return addDoc(counterRef, counter);
    }

    public getListCounter(linkId: string): Observable<Array<CounterLink>> {
        let queryConstraint: QueryConstraint[] = [ where(COUNTER.LINKID, "==", linkId) ];
        const counterRef = query(collection(this.fire, COUNTER.COLLECTION), ...queryConstraint);
        return collectionData(counterRef, { idField: 'id'}) as Observable<CounterLink[]>;
    }
    
    public incrementCounter(id: string, datetime: string) {
        const counterRef = doc(this.fire, `${COUNTER.COLLECTION}/${id}`);
        return updateDoc(counterRef, { datetime: arrayUnion(datetime) });
    }
}