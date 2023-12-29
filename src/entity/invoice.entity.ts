import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { floatTransformer } from "../utils/floatTransformer";
import { Customer } from "./customer.entity";
import { Seller } from "./seller.entity";
import { InvoiceDetail } from "./invoice-detail.entity";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;
    
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    total: number;
    
    @ManyToOne(() => Customer, (customer) => customer.invoices)
    customer: Customer;

    @ManyToOne(() => Seller, (seller) => seller.invoices)
    seller: Seller;

    @OneToMany(() => InvoiceDetail, (InvoiceDetail) => InvoiceDetail.invoice)
    invoiceDetails: InvoiceDetail[]
}
