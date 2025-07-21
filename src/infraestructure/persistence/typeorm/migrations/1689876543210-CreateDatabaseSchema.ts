import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDatabaseSchema1689876543210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar tabela users
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        );

        // Criar tabela products
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "stock",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        );

        // Criar tabela orders
        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "total",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        );

        // Criar tabela order_items
        await queryRunner.createTable(
            new Table({
                name: "order_items",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "order_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "product_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "quantity",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    }
                ]
            }),
            true
        );

        // Adicionar chaves estrangeiras
        await queryRunner.createForeignKey(
            "orders",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL"
            })
        );

        await queryRunner.createForeignKey(
            "order_items",
            new TableForeignKey({
                columnNames: ["order_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "orders",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "order_items",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover tabelas na ordem inversa para evitar problemas com chaves estrangeiras
        await queryRunner.dropTable("order_items");
        await queryRunner.dropTable("orders");
        await queryRunner.dropTable("products");
        await queryRunner.dropTable("users");
    }
}
