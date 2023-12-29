import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    address: string;

    @Column()
    phone: number;

    @OneToMany(() => Invoice, (invoice) => invoice.customer)
    invoices: Invoice[]
}
