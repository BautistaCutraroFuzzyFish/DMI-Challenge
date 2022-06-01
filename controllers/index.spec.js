const { getIsGreaterController } = require('.');

jest.mock('../services', () => ({
  getIsGreaterService: jest.fn(() => ({
    data: { isGreater: true, status: 200 },
    status: 200
  }))
}));

describe('weather controller', () => {
  const req = {
    query: {
      lat: '10',
      lon: '20'
    }
  };
  const sendMock = jest.fn();
  const codeMock = jest.fn(() => ({
    send: sendMock
  }));

  const reply = {
    code: codeMock
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status code 200 and isGreater in true', async () => {
    await getIsGreaterController(req, reply);
    expect(codeMock).toHaveBeenCalledTimes(1);
    expect(codeMock).toHaveBeenCalledWith(200);

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({
      isGreater: true,
      status: 200
    });
  });
});
