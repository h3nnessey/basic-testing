import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const INITIAL_BALANCE = 5000;
  const OPERATION_AMOUNT = 1000;

  let bankAccount = getBankAccount(INITIAL_BALANCE);

  beforeEach(() => {
    bankAccount = getBankAccount(INITIAL_BALANCE);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(bankAccount.getBalance() + 1)).toThrow(
      InsufficientFundsError,
    );

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccountTo = getBankAccount(INITIAL_BALANCE);

    expect(() =>
      bankAccount.transfer(bankAccount.getBalance() + 1, bankAccountTo),
    ).toThrow(InsufficientFundsError);

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);

    expect(bankAccountTo.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      bankAccount.transfer(bankAccount.getBalance(), bankAccount),
    ).toThrow(TransferFailedError);

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(OPERATION_AMOUNT).getBalance()).toBe(
      INITIAL_BALANCE + OPERATION_AMOUNT,
    );
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(OPERATION_AMOUNT).getBalance()).toBe(
      INITIAL_BALANCE - OPERATION_AMOUNT,
    );
  });

  test('should transfer money', () => {
    const bankAccountTo = getBankAccount(INITIAL_BALANCE);

    expect(
      bankAccount.transfer(OPERATION_AMOUNT, bankAccountTo).getBalance(),
    ).toBe(INITIAL_BALANCE - OPERATION_AMOUNT);

    expect(bankAccountTo.getBalance()).toBe(INITIAL_BALANCE + OPERATION_AMOUNT);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(OPERATION_AMOUNT);

    const fetchBalanceResult = await bankAccount.fetchBalance();

    expect(typeof fetchBalanceResult).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(OPERATION_AMOUNT);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(OPERATION_AMOUNT);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });
});
