import { getPaginationPost } from 'lib/getPaginationPost'
import { GetServerSideProps } from 'next'
import Posts from './post/index'

export const getServerSideProps: GetServerSideProps = getPaginationPost

export default Posts