import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Checkout:NextPage = () => {
  return (
   <div>
    <h1 className='text-4xl flex h-60 items-center justify-center'>
        در حال توسعه ...
    </h1>
   </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale as string, ['common']),
  },
})

export default Checkout;
