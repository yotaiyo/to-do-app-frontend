import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    font-family: 'Vollkorn', serif;
    font-size: 20px;
`

const SectionWrapper = styled.div`
    border-bottom: solid 1px #CCCCCC;
    padding: 20px;
`

export const Section = () => (
    <Wrapper>
        <SectionWrapper>yotaiyo-to-do-appとは</SectionWrapper>
        <SectionWrapper>ホーム</SectionWrapper>
        <SectionWrapper>ログイン</SectionWrapper>
        <SectionWrapper>新規登録</SectionWrapper>
    </Wrapper>
)