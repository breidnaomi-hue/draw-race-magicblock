'use client';
import {Music2,Volume2,Play} from 'lucide-react';
import {AudioPreferences,AudioState} from '../lib/game-audio';
import {useGameLanguage} from './game-language';
import {GameButton} from './game-ui';
export default function AudioSettings({settings,status,update,unlock}:{settings:AudioPreferences;status:AudioState;update:(p:Partial<AudioPreferences>)=>void;unlock:()=>void}){
 const {tx}=useGameLanguage();
 return <fieldset className="audio-settings"><legend><Music2 size={16}/> {tx('Music & sound','Музыка и звук')}</legend>
  <label className="settings-row"><span>{tx('Mute all audio','Выключить весь звук')}</span><input aria-label={tx('Mute all audio','Выключить весь звук')} type="checkbox" checked={settings.muted} onChange={e=>update({muted:e.target.checked})}/></label>
  <label className="settings-row"><span><Music2 size={15}/> {tx('Music','Музыка')}</span><input aria-label={tx('Music enabled','Музыка включена')} type="checkbox" checked={settings.musicEnabled} onChange={e=>update({musicEnabled:e.target.checked})}/></label>
  <label className="audio-slider"><span>{tx('Music volume','Громкость музыки')}</span><output>{Math.round(settings.musicVolume*100)}%</output><input aria-label={tx('Music volume','Громкость музыки')} type="range" min="0" max="100" value={Math.round(settings.musicVolume*100)} onChange={e=>update({musicVolume:+e.target.value/100})}/></label>
  <label className="settings-row"><span><Volume2 size={15}/> {tx('Race effects','Звуки событий')}</span><input aria-label={tx('Sound effects enabled','Звуковые эффекты включены')} type="checkbox" checked={settings.sfxEnabled} onChange={e=>update({sfxEnabled:e.target.checked})}/></label>
  <label className="audio-slider"><span>{tx('Effects volume','Громкость эффектов')}</span><output>{Math.round(settings.sfxVolume*100)}%</output><input aria-label={tx('Effects volume','Громкость эффектов')} type="range" min="0" max="100" value={Math.round(settings.sfxVolume*100)} onChange={e=>update({sfxVolume:+e.target.value/100})}/></label>
  <div className="audio-status" role="status" data-audio-state={status.unlocked?'unlocked':'locked'} data-audio-cue={status.playing||'silent'}>
   <Music2 size={16}/><span>{settings.muted?tx('All audio is muted.','Весь звук выключен.'):!status.unlocked?tx('Audio starts after your first tap.','Звук запустится после первого нажатия.'):status.error?tx('Music could not load. Tap to retry.','Музыка не загрузилась. Нажмите для повтора.'):status.loading?tx('Loading your soundtrack…','Загружаем музыку…'):!settings.musicEnabled?tx('Music is off. Effects keep their own setting.','Музыка выключена. Эффекты настраиваются отдельно.'):status.paused?tx('Replay and music are paused.','Повтор и музыка на паузе.'):status.playing?tx(status.title):tx('Ready for the next race.','Всё готово к следующему забегу.')}</span>
   {(!status.unlocked||status.error)&&<GameButton variant="secondary" onClick={unlock}><Play size={14}/>{tx('ENABLE AUDIO','ВКЛЮЧИТЬ ЗВУК')}</GameButton>}
  </div><p className="audio-credit">{tx('Four original instrumental themes. MusicVAE melodies, custom arrangement and synthesis.','Четыре оригинальные инструментальные темы. Мелодии MusicVAE, собственные аранжировка и синтез.')}</p>
 </fieldset>;
}
