import styled from '@emotion/styled';
import { ContactData } from '../@types';

type Props = {
  type: 'groom' | 'bride';
  data: ContactData[];
};

export const Contact = (props: Props) => {
  const { type, data } = props;

  const title = type === 'groom' ? '신랑 측 연락처' : '신부 측 연락처';

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Title>
          {title}
        </Styled.Title>
        <Styled.Divider />
        {data.map((contact) => (
          <Styled.Row key={contact.type}>
            <Styled.Name>
              <span className={type}>{contact.type}</span>
              <p>{contact.name}</p>
            </Styled.Name>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
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

      &.groom {
        color: #8ba337;
      }
      &.bride {
        color: #c87474;
      }
    }
    & p {
      font-size: 1.2rem;
      font-weight: 400;
    }
  `,
  Tel: styled.a`
    font-size: 1.2rem;
    font-weight: 400;
    color: #555;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  Divider: styled.hr`
    border: none;
    border-top: 1px solid #EFEFEF;
    margin: 0;
  `,
};