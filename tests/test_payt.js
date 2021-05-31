import server from "../server/server";
import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp);

let payt_trx_number;

describe(`Payment transaction APIs`, () => {
  let payt_trx_number;
  //find all payment transaction
  describe("test GET route /api/payt", () => {
    it("It should return all payment transaction", (done) => {
      chai
        .request(server)
        .get("/api/payt")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.not.be.eq(0);
          done();
        });
    });

    it("It should Not return all payment transaction", (done) => {
      chai
        .request(server)
        .get("/api/payts")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  //find one payment transaction
  describe("test find one data by Id payment transaction", () => {
    it("It should return payment transaction with specific Id", (done) => {
      const Id = 12;
      chai
        .request(server)
        .get(`/api/payt/${Id}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          response.body.should.have.property("payt_trx_number");
          response.body.should.have.property("payt_id").eq(Id);
          done();
        });
    });

    it("It should NOT return payment transaction with specific Id", (done) => {
      const Id = 999;
      chai
        .request(server)
        .get(`/api/payt/${Id}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.a("object");
          done();
        });
    });
  });

  //create topup
  describe("create topup through bank transfer method", () => {
    it("It should be create new payment transaction with type transaction topup", (done) => {
      const payt = {
        payt_paac_account_number: "PAAC20210526-0001",
        payt_bacc_acc_bank: "9087651409",
        payt_type: "topup",
        payt_dabet: 10000,
      };
      chai
        .request(server)
        .post("/api/payt/topup")
        .send(payt)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("payt_type").eq("topup");
          done();
        });
    });

    it("It should be NOT create new payment transaction with type transaction topup", (done) => {
      const payt = {
        payt_paac_account_number: "PAAC20210526-0001",
        payt_bacc_acc_bank: "9087651409",
        payt_type: "topup",
        payt_dabet: 10000000,
      };
      chai
        .request(server)
        .post("/api/payt/topup")
        .send(payt)
        .end((err, response) => {
          response.should.have.status(501);
          response.should.be.a("object");
          response.body.should.have.property("message").eq("saldo tidak cukup");
          done();
        });
    });
  });

  //create order
  describe("create new order through wallet", () => {
    it("It should create new order with specific price through wallet", (done) => {
      const payt = {
        payt_paac_account_number: "PAAC20210526-0001",
        payt_type: "order",
        payt_credit: 10000,
      };
      chai
        .request(server)
        .post("/api/payt/order")
        .send(payt)
        .end((err, response) => {
          payt_trx_number = response.body.payt_trx_number;
          response.should.have.status(200);
          response.should.be.a("object");
          response.body.should.have.property("payt_type").eq("order");
          done();
        });
    });

    it("It should NOT create new order with specific price through wallet", (done) => {
      const payt = {
        payt_paac_account_number: "PAAC20210526-0001",
        payt_type: "order",
        payt_credit: 10000000000000,
      };
      chai
        .request(server)
        .post("/api/payt/order")
        .send(payt)
        .end((err, response) => {
          response.should.have.status(501);
          response.should.be.a("object");
          response.body.should.have.property("message").eq("saldo tidak cukup");
          done();
        });
    });
  });

  //create refund with specific order
  describe("create refund with order reject and use invoice order to create invoice refund", () => {
    it("It should create new refund with invoice order reject base", (done) => {
      const payt = {
        payt_paac_account_number: "PAAC20210526-0001",
        payt_type: "refund",
        payt_trx_number_ref: payt_trx_number,
      };
      chai
        .request(server)
        .post("/api/payt/refund")
        .send(payt)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          response.body.should.have.property("payt_type").eq("refund");
          done();
        });
    });
  });
});
