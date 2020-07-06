import { runSaga } from "redux-saga";
import MockAdapter from "axios-mock-adapter";
import api from "../../../services/api";
import { getTechsSuccess, getTechsFailure } from "./actions";
import { getTechs } from "./sagas";

const apiMock = new MockAdapter(api);

describe("Techs Saga", () => {
  it("chamada fech no saga sucesso", async () => {
    const dispatch = jest.fn();

    apiMock.onGet("/techs").reply(200, ["Node.js"]);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(["Node.js"]));
  });

  it("chamada fech no saga erro", async () => {
    const dispatch = jest.fn();

    apiMock.onGet("/techs").reply(500);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
});
