import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  const INITIAL_BALANCE = 5000;
  const OPERATION_AMOUNT = 1000;

  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    expect(() => bankAccount.withdraw(bankAccount.getBalance() + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccountFrom = getBankAccount(INITIAL_BALANCE);
    const bankAccountTo = getBankAccount(INITIAL_BALANCE);

    expect(() =>
      bankAccountFrom.transfer(bankAccountFrom.getBalance() + 1, bankAccountTo),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    expect(() =>
      bankAccount.transfer(bankAccount.getBalance(), bankAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE);
    const depositAmount = 1000;

    expect(bankAccount.deposit(depositAmount).getBalance()).toBe(
      INITIAL_BALANCE + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(INITIAL_BALANCE);

    expect(bankAccount.withdraw(OPERATION_AMOUNT).getBalance()).toBe(
      INITIAL_BALANCE - OPERATION_AMOUNT,
    );
  });

  test('should transfer money', () => {
    const bankAccountFrom = getBankAccount(INITIAL_BALANCE);
    const bankAccountTo = getBankAccount(INITIAL_BALANCE);

    expect(
      bankAccountFrom.transfer(OPERATION_AMOUNT, bankAccountTo).getBalance(),
    ).toBe(INITIAL_BALANCE - OPERATION_AMOUNT);

    expect(bankAccountTo.getBalance()).toBe(INITIAL_BALANCE + OPERATION_AMOUNT);
  });

  // test('fetchBalance should return number in case if request did not failed', async () => {
  //   // Write your tests here
  // });

  // test('should set new balance if fetchBalance returned number', async () => {
  //   // Write your tests here
  // });

  // test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
  //   // Write your tests here
  // });
});
