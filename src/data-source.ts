import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/product.entity"
import { Seller } from "./entity/seller.entity"
import { Invoice } from "./entity/invoice.entity"
import { InvoiceDetail } from "./entity/invoice-detail.entity"
import { Customer } from "./entity/customer.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "admin",
    database: "nestDB",
    synchronize: true,
    logging: false,
    entities: [
        Product,
        Seller,
        Invoice,
        InvoiceDetail,
        Customer
    ],
    migrations: [],
    subscribers: [],
})
