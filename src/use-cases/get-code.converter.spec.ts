import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCodeRepository } from "@/repositories/in-memory/in-memory-code-repository";
import { GetCodeConverterUseCase } from "./get-code-converter";
import { InvalidRequestError } from './errors/invalid-request';

let codeRepository: InMemoryCodeRepository;
let sut: GetCodeConverterUseCase;

describe('GetCodeConverterUseCase', () => {
  beforeEach(() => {
    codeRepository = new InMemoryCodeRepository();
    sut = new GetCodeConverterUseCase(codeRepository);
  })

  it('should return code converted', async() => {
    const html = '<header>Header Section</header>';
    const section = 'header';

    const codeConverted = await sut.execute({ html, section });

    expect(codeConverted).toEqual(expect.any(String))
  })

  it('should not convert code without html', async() => {
    const html = '';
    const section = 'header';

    await expect(() =>
      sut.execute({
        html, section
      }),
    ).rejects.toBeInstanceOf(InvalidRequestError)
  })

  it('should not convert code without section', async() => {
    const html = '<header>Header Section</header>';
    const section = '';

    await expect(() =>
      sut.execute({
        html, section
      }),
    ).rejects.toBeInstanceOf(InvalidRequestError)
  })
})