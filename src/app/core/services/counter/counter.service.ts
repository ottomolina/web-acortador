import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { addDoc, collection, doc, query, QueryConstraint, updateDoc, where } from "firebase/firestore";
import { COUNTER } from "../../constants/counter.constants";
import { CounterLink } from "../../interfaces/counter-link.model";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    constructor(
        private fire: Firestore,
        private auth: AuthService,
    ){}

    public createCounter(linkId: string) {
        const { id: uid } = this.auth.user!;
        const counter: CounterLink = { linkId, uid, datetime: [] }
        const counterRef = collection(this.fire, COUNTER.COLLECTION);
        return addDoc(counterRef, counter);
    }

    public getCounterByLinkId(linkId: string): Observable<Array<CounterLink>> {
        let queryConstraint: QueryConstraint[] = [ where(COUNTER.LINKID, "==", linkId) ];
        const counterRef = query(collection(this.fire, COUNTER.COLLECTION), ...queryConstraint);
        return collectionData(counterRef, { idField: 'id'}) as Observable<CounterLink[]>;
    }

    public getListCounterByUid(): Observable<Array<CounterLink>> {
        const { id: uid } = this.auth.user!;
        let queryConstraint: QueryConstraint[] = [ where(COUNTER.UID, "==", uid) ];
        const counterRef = query(collection(this.fire, COUNTER.COLLECTION), ...queryConstraint);
        return collectionData(counterRef, { idField: 'id'}) as Observable<CounterLink[]>;
    }
    
    public incrementCounter(counter: CounterLink) {
        const {id, datetime} = counter
        const counterRef = doc(this.fire, `${COUNTER.COLLECTION}/${id}`);
        return updateDoc(counterRef, { datetime });
    }
}