import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @OneToMany(() => Invoice, (invoice) => invoice.seller)
    invoices: Invoice[];
}
