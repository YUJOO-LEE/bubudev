import styled from '@emotion/styled';
import { useState } from 'react';
import { ContactData } from '../@types';

type Props = {
  data: ContactData[];
};

export const Contact = (props: Props) => {
  const { data } = props;

  const [copied, setCopied] = useState<string>();

  const handleCopy = (bankName: string, bankNumber: string) => () => {
    const text = `${bankName} ${bankNumber.replace(/-/g, '')}`;

    setCopied(bankNumber);
    navigator.clipboard.writeText(text);
  };

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Title>
          마음 전하실 곳
        </Styled.Title>
        <Styled.Divider/>
        {data.map((contact) => (
          <Styled.Row key={contact.type}>
            <Styled.Name>
              <span>{contact.type}</span>
              <p>{contact.name}</p>
            </Styled.Name>
            <Styled.Bank>
              <Styled.BankName>
                <Styled.Button onClick={handleCopy(contact.bankName, contact.bankNumber)}>
                  {copied === contact.bankNumber ? '복사됨' : '복사하기'}
                </Styled.Button>
              </Styled.BankName>
              {contact.bankName} {contact.bankNumber}
            </Styled.Bank>
          </Styled.Row>
        ))}
      </Styled.Inner>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  `,
  Inner: styled.div`
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  Title: styled.h2`
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
  `,
  Row: styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 0.5rem;
    align-items: flex-end;
  `,
  Name: styled.div`
    display: grid;
    gap: 0.5rem;

    & span {
      font-size: 0.9rem;
      color: #888;
    }

    & p {
      font-size: 1.2rem;
      font-weight: 400;
    }
  `,
  Bank: styled.div`
    display: grid;
    gap: 0.5rem;
    text-align: right;

    & p {
      font-size: 1.2rem;
      font-weight: 400;
    }
  `,
  BankName: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  `,
  Button: styled.button`
    border: none;
    color: #555;
    font-size: 0.8rem;
    font-weight: 400;
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
      background-color: #e0e0e0;
    }
  `,
  Divider: styled.hr`
    border: none;
    border-top: 1px solid #EFEFEF;
    margin: 0;
  `,
};