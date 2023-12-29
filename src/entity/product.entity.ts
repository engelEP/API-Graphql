import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { floatTransformer } from "../utils/floatTransformer";
import { InvoiceDetail } from "./invoice-detail.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    unitOfMeasure: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    price: number;

    @Column()
    stock: number

    @OneToMany(() => InvoiceDetail, (InvoiceDetail) => InvoiceDetail.product)
    invoicesDetails: InvoiceDetail[]
}
