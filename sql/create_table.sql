-- Membuat auto generated id's with specific format

CREATE SEQUENCE seq_paac_number
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  
CREATE SEQUENCE seq_pyt_trx
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  
create or replace function pacc_id () returns varchar as $$
select CONCAT('PAAC',to_char(now(),'YYYYMMDD'),'-',lpad(''||nextval('seq_paac_number'),4,'0'))
$$ language sql

create or replace function pyt_trx () returns varchar as $$
select CONCAT('PAY',to_char(now(),'YYYYMMDD'),'-',lpad(''||nextval('seq_pyt_trx'),4,'0'))
$$ language sql

CREATE TABLE users (
	user_id VARCHAR(30) PRIMARY KEY,
	user_name VARCHAR(20) NOT NULL,
	user_email VARCHAR(55) NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_salt VARCHAR(255),
	user_birthdate DATE,
	user_gender VARCHAR(6),
	user_avatar VARCHAR(150),
	user_desc VARCHAR(55),
	user_phone VARCHAR(15),
	user_id_card VARCHAR(30)
);

CREATE TABLE address (
	addr_id SERIAL PRIMARY KEY,
	addr_street_1 VARCHAR(100),
	addr_street_2 VARCHAR(100),
	addr_city VARCHAR(100)
);

CREATE TABLE bank (
	bank_id VARCHAR(3) PRIMARY KEY,
	bank_name VARCHAR(255)
);

CREATE TABLE bank_account (
	baac_acc_bank VARCHAR(25) PRIMARY KEY,
	baac_owner VARCHAR(85) NOT NULL,
	baac_saldo NUMERIC(20,2),
	bacc_pin_number VARCHAR(6),
	baac_start_date DATE,
	baac_end_date DATE,
	baac_type VARCHAR(20) NOT NULL,
	baac_user_id VARCHAR(30),
	baac_bank_id VARCHAR(3) NOT NULL,
	FOREIGN KEY (baac_user_id) REFERENCES users(user_id)
	ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (baac_bank_id) REFERENCES bank(bank_id)
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE payment_account (
	paac_account_number TEXT DEFAULT pacc_id() PRIMARY KEY,
	pacc_saldo NUMERIC(20,2),
	pacc_pin_number VARCHAR(6),
	pacc_user_id VARCHAR(30) NOT NULL,
	FOREIGN KEY (pacc_user_id) REFERENCES users(user_id) 
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE payment_transaction(
	payt_id SERIAL PRIMARY KEY,
	payt_trx_number TEXT DEFAULT pyt_trx(),
	payt_trx_number_ref VARCHAR(100),
	payt_order_number VARCHAR(150),
	payt_bacc_acc_bank VARCHAR(25),
	payt_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	payt_dabet NUMERIC(20,2),
	payt_credit NUMERIC(20,2),
	payt_desc VARCHAR(255),
	payt_type VARCHAR(20),
	payt_paac_account_number TEXT NOT NULL,
	FOREIGN KEY (payt_paac_account_number) REFERENCES payment_account(paac_account_number)
	ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE payment_save (
	pays_id SERIAL PRIMARY KEY,
	pays_amount NUMERIC(20,2),
	pays_order_number VARCHAR(150),
	pays_desc VARCHAR(150)
)
