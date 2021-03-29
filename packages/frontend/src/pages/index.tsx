import { NextPage } from 'next';
import { Index as IndexTemplate } from '@/components/templates/Index';
import { HeadTag } from '@/components/atoms/HeadTag';

const Index: NextPage = () => {
    return (
        <>
            <HeadTag
                title={'Tokenized Url'}
                url={'https://tokenized-url.vercel.app/'}
            />
            <IndexTemplate />
        </>
    );
};

export default Index;
