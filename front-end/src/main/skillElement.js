import React,{useState} from 'react';
import { Handle } from 'react-flow-renderer';
import {Button}from 'antd'
import { useStore } from '../store';
import SkillCard from './skillCard';
import './main.css'

export const skillEdges1 = [
  { id: 'e4-5', source: '4', target: '5'},
  { id: 'e4-6', source: '4', target: '6' },
];


export const skillNodes1 = [
  { id: '4', position: { x: 300, y: 100 }, data: { label: <SkillCard id={4}></SkillCard> }, type:'input' },
  { id: '5', position: { x: 100, y: 300 }, data: { label: <SkillCard id={5}></SkillCard> } , type:'output'},
  { id: '6', position: { x: 500, y: 300 }, data: { label: <SkillCard id={6}></SkillCard> } , type:'output'},
];

export const skillEdges2= [
  { id: 'e1-2', source: '1', target: '2'},
  { id: 'e1-3', source: '1', target: '3' },
];


export const skillNodes2 = [
  { id: '1', position: { x: 300, y: 100 }, data: { label: <SkillCard id={1}></SkillCard> }, type:'input' },
  { id: '2', position: { x: 100, y: 300 }, data: { label: <SkillCard id={2}></SkillCard> } , type:'output'},
  { id: '3', position: { x: 500, y: 300 }, data: { label: <SkillCard id={3}></SkillCard> } , type:'output'},
];
