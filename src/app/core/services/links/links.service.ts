import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, query, QueryConstraint, where } from 'firebase/firestore';
import { LINK } from '../../constants/links.constants';
import { AuthService } from '../auth/auth.service';
import { ShortLink } from '../../interfaces/short-link.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LinksService {

    constructor(
        private fire: Firestore,
        private auth: AuthService
    ){}

    public getData(): Observable<Array<ShortLink>> {
        const { id: uid } = this.auth.user!;
        let queryConstraint: QueryConstraint[] = [ where(LINK.UID, "==", uid) ];
        
        const linkRef = query(collection(this.fire, LINK.COLLECTION), ...queryConstraint);
        return collectionData(linkRef, { idField: 'id'}) as Observable<ShortLink[]>;
    }

}